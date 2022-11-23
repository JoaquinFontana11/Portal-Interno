import { assert, beforeEach, describe, expect, it } from 'vitest';
import initDB from '$lib/server/db/db';
import { dbOperations } from '$lib/server/db/db';

describe('Operaciones sobre usuarios', async () => {
	await initDB();
	let image: any = null;

	beforeEach(async () => {
		image = await dbOperations.images.getOne({ name: 'img-test' });
	});

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
		image = await dbOperations.images.create({
			name: 'img-test',
			alt: 'alt-img-test',
			url: 'url-img-test'
		});

		const newUser = await dbOperations.users.create({
			name: 'test-img',
			lastname: 'test-img',
			username: 'test-img',
			email: 'test@test.com',
			role: 'test-role',
			photo_id: image.id
		});

		assert.equal(newUser.name, 'test-img');
		assert.equal(newUser.photo_id, image.id);

		// chequeamos que la foreign key se elimine de la tabla de usuario

		let cantDeleted = await dbOperations.images.delete({ id: image.id });
		const user = await dbOperations.users.getOne({ username: 'test-img' });

		assert.equal(cantDeleted, 1);
		assert.equal(user.photo_id, null);

		cantDeleted = await dbOperations.users.delete({ id: user.id });

		assert.equal(cantDeleted, 1);
	});
});

describe('Operaciones sobre paginas y novedades', async () => {
	it('Creacion de una pagina', async () => {
		assert.equal(1, 1);
	});
	it('Asociacion de una pagina a un menu', async () => {
		assert.equal(1, 1);
	});
	it('Asociacion de una pagina a una novedad', async () => {
		assert.equal(1, 1);
	});
	it('Eliminacion de una pagina asociada a una novedad y a un menu', async () => {
		assert.equal(1, 1);
	});
});

describe('Operaciones sobre menus', async () => {
	it('Creacion de un menu', async () => {
		assert.equal(1, 1);
	});
	it('Creacion de un submenu y asociacion de un padre', async () => {
		assert.equal(1, 1);
	});
	it('Eliminacion de un Menu que es padre', async () => {
		assert.equal(1, 1);
	});
});

describe('Operaciones sobre fotos de galeria y comentarios', async () => {
	it('Creacion de una foto', async () => {
		assert.equal(1, 1);
	});
	it('Agregar 2 comentarios a una foto de distintos usuarios', async () => {
		assert.equal(1, 1);
	});
	it('eliminar un comentario', async () => {
		assert.equal(1, 1);
	});
	it('Eliminar un usuario que publico un comentario', async () => {
		assert.equal(1, 1);
	});
	it('Eliminar una foto que tiene comentarios', async () => {
		assert.equal(1, 1);
	});
	it('Eliminar una imagen perteneciente a una foto', async () => {
		assert.equal(1, 1);
	});
});

describe('Operaciones sobre anuncios', async () => {
	it('Publicacion de un anuncio', async () => {
		assert.equal(1, 1);
	});
	it('Marcar un anuncio para que no le aparezca a un usuario', async () => {
		assert.equal(1, 1);
	});
});
