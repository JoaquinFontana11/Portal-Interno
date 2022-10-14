import { describe, expect, it } from 'vitest';
import { getPage, createPage } from '$lib/server/db';

describe('Operaciones osbre paginas', async () => {
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

	it('Modificar una pagina', async () => {
		const pageUpdate = {
			title: 'nuevo titulo'
		};
		const newPage = await updatePage('6331d3dcfdbab6684d70b28b', pageUpdate);
		expect(newPage.title).toBe('nuevo titulo');
	});
});

describe('Operaciones con comentarios', async () => {
	let user = null;
	let photo = null;

	beforeEach(async () => {
		user = await getUser('id-usuario');
		photo = await getUser('id-photo');
	});

	it('Creacion de un comentario', async () => {
		const comment = {
			text: 'soy un comentario nuevo',
			user: user._id
		};
		const newComment = createComment(comment);
		expect(newComment.text).toBe('soy un comentario nuevo');
	});

	it('Publicacion de un comentario', async () => {
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

describe('Operaciones con anuncios', async () => {
	let user = null;
	let ad = null;

	beforeEach(async () => {
		user = await getUser('id-usuario');
		ad = await getAd('id-ad');
	});
	it('Public}acion del anuncio', async () => {
		const ad = {
			content: 'anuncio generado por un test',
			initDate: new Date('2022-10-22'),
			endDate: new Date('2022-10-24')
		};

		const newAd = await craeteAd(ad);
		expect(newAd.content).toBe('anuncio generado por un test');
	});

	it('Visualizacion del anuncio', async () => {
		const closed = [...ad.userClosed, user._id];
		const updatedAd = await updateAd(ad._id, { closed });
		expect(updatedAd.userClosed.includes(ad._id)).toBe(true);
	});
});

describe('Operaciones con proyectos', async () => {
	it('Alta de un proyecto', async () => {
		const project = {
			name: 'nuevo proyecto',
			slug: 'nuevo-proyecto'
		};

		const newProject = createProject(project);
		expect(newProject.name).toBe('nuevo proyecto');
	});
	it('Modificar un proyecto', async () => {
		const project = await getProject({ name: 'nuevo proyecto' });
		const newProject = updateProject(project._id, { name: 'nuevo proyecto 2' });
		expect(newProject.name).toBe('nuevo proyecto');
	});
	it('Baja de un proyecto', async () => {
		const project = await getProject({ name: 'nuevo proyecto 2' });
		await deleteProject(project._id);
		const projectDelete = await getProject({ name: 'nuevo proyecto 2' });
		expect(projectDelete).toBe(null);
	});
});

describe('Operaciones con usuarios', async () => {
	it('Alta de un usuario', async () => {
		const user = {
			name: 'juan',
			lastName: 'perez',
			username: 'juanpi',
			password: '123',
			email: 'juan@perez.com',
			birthDay: new Date('2022-10-24')
		};

		const newUser = createUser(user);
		expect(newUser.name).toBe('juan');
	});
	it('Modificar un usuario', async () => {
		const user = await getUser({ name: 'juan' });
		const newUser = updateUser(user._id, {
			name: 'juan 2'
		});
		expect(newUser.name).toBe('juan 2');
	});
	it('Baja de un usuario', async () => {
		const user = await getUser({ name: 'juan 2' });
		await deleteUser(user._id);
		const userDelete = await getUser({ name: 'juan 2' });
		expect(userDelete).toBe(null);
	});
});

describe('Operaciones con imagenes', async () => {
	// it('Alta de una imagen', async () => {});
	// it('Baja de una imagen', async () => {});
	// it('Modificar una imagen', async () => {});
	it('Alta de una imagen', async () => {
		const image = {
			url: '/img/prueba.png',
			alt: 'nuevo-proyecto'
		};

		const newImage = createImage(image);
		expect(newImage.url).toBe('/img/prueba.png');
	});
	it('Modificar una imagen', async () => {
		const project = {
			name: 'nuevo proyecto 2'
		};

		const newImage = updateProject(project);
		expect(newProject.name).toBe('nuevo proyecto');
	});
	it('Baja de un proyecto', async () => {
		const project = await getProject({ name: 'nuevo proyecto 2' });
		await deleteProject(project._id);
		const projectDelete = await getProject({ name: 'nuevo proyecto 2' });
		expect(projectDelete).toBe(null);
	});
});

describe('Operaciones con preguntas frecuentes', async () => {
	let page = null;

	beforeEach(async () => {
		page = await getPage('id-page');
	});

	it('Alta de una pregunta frecuente', async () => {});
	it('Baja de una pregunta frecuente', async () => {});
	it('Modificar una pregunta frecuente', async () => {});
});
