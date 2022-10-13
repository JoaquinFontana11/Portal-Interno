import { describe, expect, it } from 'vitest';
import { getPage, createPage } from '$lib/server/db';
import { getSuggestedQuery } from '@testing-library/svelte';

// describe('Sample Test Block', () => {
// 	it('sample test which should be true', () => {
// 		expect(true).toBe(true);
// 	});
// });

describe('CRUD sobre paginas', async () => {
	it('Obtener una pagina', async () => {
		const page = await getPage('6331d3dcfdbab6684d70b28b');
		expect(page.title).toBe('Pagina Test');
	});

	it('Crear una pagina', async () => {
		const page = {
			title: 'Pagina Test creada en un test',
			body: '<p>Hola mundo! desde el test!</p>',
			slug: 'pagina-test-creada-en-un-test',
			isNovelty: false,
			image: '#',
			banner: '#',
			date: '2022-09-26T16:31:24.481+00:00',
			questionActive: false,
			questions: []
		};
		const newPage = await createPage(page);
		expect(newPage.title).toBe('Pagina Test creada en un test');
	});
});

describe('Operaciones con comentarios', async () => {
	let user = null;
	let photo = null;

	beforeEach(async () => {
		user = await getUser('id-usuario');
		photo = await getUser('id-photo');
	});

	it('creacion de un comentario', async () => {
		const comment = {
			text: 'soy un comentario nuevo',
			user: user._id
		};
		const newComment = createComment(comment);
		expect(newComment.text).toBe('soy un comentario nuevo');
	});

	it('publicacion de un comentario', async () => {
		const comment = {
			text: 'soy un comentario nuevo',
			user: user._id
		};
		const newComment = createComment(comment);

		const comments = [...photo.comments, newComment._id];
		const updatedPhoto = await updatePhoto(photo._id, { comments });
		expect(updatedPhoto.comments.includes(newComment._id)).toBe(true);
	});
});

describe('Operaciones con menus', async () => {
	it('Crear un menu y asociarle un submenu', async () => {
		const menu = {
			name: 'menu test'
		};
		const newMenu = await createMenu(menu);
		await createSubmenu({
			name: 'submenu test',
			parent: newMenu._id
		});

		const menuPopulated = await getMenuPopulated(newMenu._id);

		expect(menuPopulated.submenus.map((submenu) => submenu.name).includes('submenu test')).toBe(
			true
		);
	});
});
