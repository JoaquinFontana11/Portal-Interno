import { assert, beforeEach, describe, expect, it, afterAll, beforeAll } from 'vitest';
import initDB from '$lib/server/db/db';
import { dbOperations } from '$lib/server/db/db';

describe('Operaciones sobre usuarios', async () => {
	await initDB();

	it('Creacion de un usuario sin foto', async () => {
		const newUser = await dbOperations.users.create({
			name: 'test',
			lastname: 'test',
			username: 'test',
			email: 'test@test.com',
			role: 'test-role'
		});
		assert.equal(newUser.name, 'test');
	});
	it('Modificacion de un usuario', async () => {
		const oldUser = await dbOperations.users.getOne({ username: 'test' });
		const cantUpdates = await dbOperations.users.update(
			{ username: 'new-test' },
			{ username: oldUser.username }
		);

		const newUser = await dbOperations.users.getOne({ username: 'new-test' });

		assert.equal(cantUpdates, 1);
		assert.equal(newUser.id, oldUser.id);
	});
	it('Eliminacion de un usuario', async () => {
		const deleteUser = await dbOperations.users.getOne({ username: 'new-test' });
		const cantDeleted = await dbOperations.users.delete({ id: deleteUser.id });

		assert.equal(cantDeleted, 1);
	});
	it('Creacion y eliminacion de un usuario con foto ', async () => {
		const image = await dbOperations.images.create({
			name: 'img-test',
			alt: 'alt-img-test',
			url: 'url-img-test'
		});

		console.log(image);

		const newUser = await dbOperations.users.create({
			name: 'test-img',
			lastname: 'test-img',
			username: 'test-img',
			email: 'test@test.com',
			role: 'test-role',
			photo_id: image.id
		});

		let user = await dbOperations.users.getOne({ name: 'test-img' });

		assert.equal(newUser.name, 'test-img');
		assert.equal(user.Image.name, image.name);

		// chequeamos que la foreign key se elimine de la tabla de usuario

		let cantDeleted = await dbOperations.images.delete({ id: image.id });
		user = await dbOperations.users.getOne({ username: 'test-img' });

		assert.equal(cantDeleted, 1);
		assert.equal(user.photo_id, null);

		cantDeleted = await dbOperations.users.delete({ id: user.id });

		assert.equal(cantDeleted, 1);
	});
});

describe('Operaciones sobre paginas, menus y novedades', async () => {
	let image: any = null;

	beforeAll(async () => {
		image = await dbOperations.images.create({
			name: 'img-test',
			alt: 'alt-img-test',
			url: 'url-img-test'
		});
	});

	afterAll(async () => {
		await dbOperations.images.delete({ id: image.id });
	});

	it('Creacion de una pagina', async () => {
		const newPage = await dbOperations.pages.create({
			title: 'page-test',
			body: '<p>body-test</p>',
			slug: 'page-test',
			project: false
		});
		assert.equal(newPage.title, 'page-test');
	});
	it('Creacion de un menu y asociacion de una pagina a un menu', async () => {
		const page = await dbOperations.pages.getOne({ title: 'page-test' });
		const newMenu = await dbOperations.menus.create({
			name: 'menu-test',
			order: 1,
			page_id: page.id,
			active: true
		});

		assert.equal(newMenu.name, 'menu-test');

		const menu = await dbOperations.menus.getOne({ name: 'menu-test' });
		assert.equal(menu.Page.title, page.title);
	});
	it('Asociacion de una pagina a una novedad', async () => {
		const page = await dbOperations.pages.getOne({ title: 'page-test' });
		await dbOperations.noveltys.create({
			date: Date.now(),
			order: 1,
			page_id: page.id,
			image_id: image.id
		});
		const novelty = await dbOperations.noveltys.getOne({ page_id: page.id });

		assert.equal(novelty.Page.name, page.name);
	});
	it('Creacion de un submenu y asociacion de un padre', async () => {
		const page = await dbOperations.pages.getOne({ title: 'page-test' });
		const menuParent = await dbOperations.menus.getOne({ name: 'menu-test' });
		const newSubMenu = await dbOperations.submenus.create({
			name: 'submenu-test',
			order: 1,
			active: true,
			page_id: page.id,
			parent_id: menuParent.id
		});

		assert.equal(newSubMenu.name, 'submenu-test');
		const subMenu = await dbOperations.submenus.getOne({ name: 'submenu-test' });
		assert.equal(subMenu.name, 'submenu-test');
	});

	it('Eliminacion de un Menu que es padre', async () => {
		const page = await dbOperations.pages.getOne({ title: 'page-test' });
		const menu = await dbOperations.menus.getOne({ name: 'menu-test' });

		await dbOperations.submenus.create({
			name: 'submenu-test-2',
			order: 1,
			active: true,
			page_id: page.id,
			parent_id: menu.id
		});

		const cantDeleted = await dbOperations.menus.delete({ id: menu.id });

		const submenu = await dbOperations.submenus.getOne({ name: 'submenu-test' });
		const submenu2 = await dbOperations.submenus.getOne({ name: 'submenu-test-2' });

		assert.equal(cantDeleted, 1);

		assert.equal(submenu.parent_id, null);
		assert.equal(submenu2.parent_id, null);

		await dbOperations.submenus.delete({ id: submenu.id });
		await dbOperations.submenus.delete({ id: submenu2.id });
	});

	it('Eliminacion de una pagina asociada a una novedad y a un menu', async () => {
		const page = await dbOperations.pages.getOne({ title: 'page-test' });

		const cantDeleted = await dbOperations.pages.delete({ id: page.id });

		const novelty = await dbOperations.noveltys.getOne({ page_id: page.id });
		const menu = await dbOperations.menus.getOne({ page_id: page.id });

		assert.equal(cantDeleted, 1);
		assert.equal(novelty.page_id, null);
		assert.equal(menu.page_id, null);
	});
});

describe('Operaciones sobre fotos de galeria y comentarios', async () => {
	let image: any = null;
	let user: any = null;
	let user2: any = null;

	beforeAll(async () => {
		image = await dbOperations.images.create({
			name: 'img-test',
			alt: 'alt-img-test',
			url: 'url-img-test'
		});

		user = await dbOperations.users.create({
			name: 'test',
			lastname: 'test',
			username: 'test',
			email: 'test@test.com',
			role: 'test-role'
		});

		user2 = await dbOperations.users.create({
			name: 'test-2',
			lastname: 'test-2',
			username: 'test-2',
			email: 'test-2@test.com',
			role: 'test-role-2'
		});
	});

	afterAll(async () => {
		await dbOperations.images.delete({ id: image.id });
		await dbOperations.users.delete({ id: user.id });
	});

	it('Creacion de una foto', async () => {
		await dbOperations.galleryPhotos.create({
			title: 'photo-test',
			image_id: image.id
		});

		const photo = await dbOperations.galleryPhotos.getOne({ title: 'photo-test' });

		assert.equal(photo.Image.name, image.name);
	});
	it('Agregar 2 comentarios a una foto de distintos usuarios', async () => {
		const photo = await dbOperations.galleryPhotos.getOne({ title: 'photo-test' });

		await dbOperations.comments.create({
			content: 'comment-test-1',
			photo_id: photo.id,
			user_id: user.id
		});
		await dbOperations.comments.create({
			content: 'comment-test-2',
			photo_id: photo.id,
			user_id: user2.id
		});

		const comment1 = await dbOperations.comments.getOne({ content: 'comment-test-1' });
		const comment2 = await dbOperations.comments.getOne({ content: 'comment-test-2' });

		assert.equal(comment1.User.name, user.name);
		assert.equal(comment2.User.name, user2.name);

		assert.equal(comment1.GalleryPhoto.title, photo.title);
		assert.equal(comment2.GalleryPhoto.title, photo.title);
	});
	it('Eliminar un usuario que publico un comentario', async () => {
		let cantDeleted = await dbOperations.users.delete({ id: user2.id });
		const comment2 = await dbOperations.comments.getOne({ content: 'comment-test-2' });

		assert.equal(cantDeleted, 1);
		assert.equal(Object.entries(comment2).length, Object.entries({}).length);
	});
	it('Eliminar una foto que tiene comentarios', async () => {
		const photo = await dbOperations.galleryPhotos.getOne({ title: 'photo-test' });
		let cantDeleted = await dbOperations.galleryPhotos.delete({ id: photo.id });

		assert.equal(cantDeleted, 1);

		const comment = await dbOperations.comments.getOne({ content: 'comment-test-1' });
		assert.equal(Object.entries(comment).length, Object.entries({}).length);

		// cantDeleted = await dbOperations.comments.delete({ content: 'comment-test-1' });
		// assert.equal(cantDeleted, 1);
	});
});
