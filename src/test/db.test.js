import { beforeEach, describe, expect, it } from 'vitest';
import {
	getUser,
	createUser,
	updateUser,
	deleteUser,
	getPage,
	createPage,
	updatePage,
	deletePage,
	getImage,
	createImage,
	updateImage,
	deleteImage,
	getImageGalery,
	createImageGalery,
	updateImageGalery,
	deleteImageGalery,
	getMenu,
	getOneMenuPopulated,
	createMenu,
	updateMenu,
	deleteMenu,
	getSubMenu,
	createSubMenu,
	updateSubMenu,
	deleteSubMenu,
	getQuestion,
	createQuestion,
	updateQuestion,
	deleteQuestion,
	getAd,
	createAd,
	updateAd,
	deleteAd,
	getComment,
	createComment,
	updateComment,
	deleteComment,
	getManual,
	createManual,
	updateManual,
	deleteManual,
	getVideo,
	createVideo,
	updateVideo,
	deleteVideo,
	getProject,
	createProject,
	updateProject,
	deleteProject
} from '$lib/server/db';

describe('Operaciones sobre paginas', async () => {
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
		const page = await getPage({ title: 'Pagina Test creada en un test' });
		const newPage = await updatePage(page._id, { title: 'Pagina test' });
		expect(newPage.title).toBe('Pagina test');
	});

	it('Eliminar una pagina', async () => {
		const page = await getPage({ title: 'Pagina test' });
		await deletePage(page._id);
		const pageDeleted = await getPage({ title: 'Pagina test' });
		expect(pageDeleted).toBe(null);
	});
});

describe('Operaciones con comentarios', async () => {
	let user = null;
	let photo = null;

	beforeEach(async () => {
		user = await getUser({ username: 'test - comentarios' });
		photo = await getImageGalery({ title: 'test - comentarios' });
	});

	it('Creacion de un comentario', async () => {
		const comment = {
			text: 'soy un comentario nuevo',
			user: user._id
		};
		const newComment = await createComment(comment);
		expect(newComment.text).toBe('soy un comentario nuevo');
	});

	it('Publicacion de un comentario', async () => {
		const comment = await getComment({ user: user._id });

		const comments = [...photo.comments, comment._id];
		const updatedPhoto = await updateImageGalery(photo._id, { comments });
		expect(updatedPhoto.comments.includes(comment._id)).toBe(true);
	});

	it('Borrar un comentario de una publicacion', async () => {
		const comment = await getComment({ user: user._id });

		photo.comments = await photo.comments.filter(
			(commentId) => commentId.toString() != comment._id.toString()
		);
		const updatedPhoto = await updateImageGalery(photo._id, { comments: photo.comments });
		expect(updatedPhoto.comments.includes(comment._id)).toBe(false);
	});

	it('Borrar un comentario', async () => {
		const comment = await getComment({ name: 'nuevo proyecto 2' });
		await deleteComment(comment._id);
		const commentDelete = await getComment({ name: 'nuevo proyecto 2' });
		expect(commentDelete).toBe(null);
	});
});

describe('Operaciones con menus', async () => {
	it('Crear un menu y asociarle un submenu', async () => {
		const menu = {
			name: 'menu test'
		};
		const newMenu = await createMenu(menu);
		await createSubMenu({
			name: 'submenu test',
			parent: newMenu._id
		});

		const menuPopulated = await getOneMenuPopulated(newMenu._id);

		expect(menuPopulated.submenus.map((submenu) => submenu.name).includes('submenu test')).toBe(
			true
		);
	});
});

describe('Operaciones con anuncios', async () => {
	let user = null;

	beforeEach(async () => {
		user = await getUser({ username: 'test - anuncios' });
	});
	it('Publicacion del anuncio', async () => {
		const ad = {
			content: 'anuncio generado por un test',
			initDate: new Date('2022-10-22'),
			endDate: new Date('2022-10-24')
		};

		const newAd = await createAd(ad);
		expect(newAd.content).toBe('anuncio generado por un test');
	});

	it('Visualizacion del anuncio', async () => {
		const ad = await getAd({ content: 'anuncio generado por un test' });
		const userClosed = [...ad.userClosed, user._id];
		const updatedAd = await updateAd(ad._id, { userClosed });
		expect(updatedAd.userClosed.includes(user._id)).toBe(true);
	});
});

describe('Operaciones con proyectos', async () => {
	it('Alta de un proyecto', async () => {
		const project = {
			name: 'nuevo proyecto',
			slug: 'nuevo-proyecto'
		};

		const newProject = await createProject(project);
		expect(newProject.name).toBe('nuevo proyecto');
	});
	it('Modificar un proyecto', async () => {
		const project = await getProject({ name: 'nuevo proyecto' });
		const newProject = await updateProject(project._id, { name: 'nuevo proyecto 2' });
		expect(newProject.name).toBe('nuevo proyecto 2');
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

		const newUser = await createUser(user);
		expect(newUser.name).toBe('juan');
	});
	it('Modificar un usuario', async () => {
		const user = await getUser({ name: 'juan' });
		const newUser = await updateUser(user._id, {
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
describe('Operacion con videos', async () => {
	it('Alta de un video', async () => {
		const video = {
			title: 'Soy un video de prueba'
		};
		const newVideo = await createVideo(video);
		expect(newVideo.title).toBe('Soy un video de prueba');
	});
	it('Modificar un video', async () => {
		const video = await getVideo({ title: 'Soy un video de prueba' });
		const newVideo = await updateVideo(video._id, { title: 'Soy un video modificado' });
		expect(newVideo.title).toBe('Soy un video modificado');
	});
	it('Dar de baja un video', async () => {
		const video = await getVideo({ title: 'Soy un video modificado' });
		await deleteVideo(video._id);
		const videoDelete = await getVideo({ title: 'Soy un video modificado' });
		expect(videoDelete).toBe(null);
	});
});
describe('Operaciones con imagenes', async () => {
	it('Alta de una imagen', async () => {
		const image = {
			url: '/img/prueba.png',
			alt: 'imagen generada en un test'
		};
		const newImage = await createImage(image);
		expect(newImage.url).toBe('/img/prueba.png');
	});
	it('Modificar una imagen', async () => {
		const image = await getImage({ url: '/img/prueba.png' });
		const newImage = await updateImage(image._id, { alt: 'imagen modificada en un test' });
		expect(newImage.alt).toBe('imagen modificada en un test');
	});
	it('Baja de una imagen', async () => {
		const image = await getImage({ url: '/img/prueba.png' });
		await deleteImage(image._id);
		const imageDelete = await getImage({ url: '/img/prueba.png' });
		expect(imageDelete).toBe(null);
	});
});

describe('Operaciones con preguntas frecuentes', async () => {
	let page = null;

	beforeEach(async () => {
		page = await getPage({ title: 'Pagina test - preguntas' });
	});

	it('Alta de una pregunta frecuente', async () => {
		const question = {
			question: '¿Esta pregunta fue generada en un test?',
			answer: 'claro que si'
		};
		const newQuestion = await createQuestion(question);
		expect(newQuestion.answer).toBe('claro que si');
	});
	it('Modificar una pregunta frecuente', async () => {
		const question = await getQuestion({ answer: 'claro que si' });
		const newQuestion = await updateQuestion(question._id, { answer: 'sigue siendo si' });
		expect(newQuestion.answer).toBe('sigue siendo si');
	});
	it('Asociar pregunta frecuente a una pagina', async () => {
		const question = await getQuestion({ answer: 'sigue siendo si' });
		page.questions.push(question._id);
		const newPage = await updatePage(page._id, { questions: page.questions });
		expect(newPage.questions.includes(question._id)).toBe(true);
	});
	it('Quitar pregunta frecuente de una pagina', async () => {
		const question = await getQuestion({ answer: 'sigue siendo si' });
		page.questions = page.questions.filter((qId) => qId.toString() != question._id.toString());
		const newPage = await updatePage(page._id, { questions: page.questions });
		expect(newPage.questions.includes(question._id)).toBe(false);
	});
	it('Baja de una pregunta frecuente', async () => {
		const question = await getQuestion({ answer: 'sigue siendo si' });
		await deleteQuestion(question._id);
		const questionDelete = await getQuestion({ answer: 'sigue siendo si' });
		expect(questionDelete).toBe(null);
	});
});

describe('Operaciones con Fotos', async () => {
	let image = null;

	beforeEach(async () => {
		image = await getImage({ url: '/img/test.png' });
		image = image._id;
	});

	it('Alta de una foto', async () => {
		const photo = {
			title: 'imagen de galeria',
			image: image
		};
		const newPhoto = await createImageGalery(photo);
		expect(newPhoto.title).toBe('imagen de galeria');
	});
	it('Modificar una foto', async () => {
		const photo = await getImageGalery({ title: 'imagen de galeria' });
		const newPhoto = await updateImageGalery(photo._id, { title: 'imagen de galeria editada' });
		expect(newPhoto.title).toBe('imagen de galeria editada');
	});
	it('Baja de una foto', async () => {
		const photo = await getImageGalery({ title: 'imagen de galeria editada' });
		await deleteImageGalery(photo._id);
		const photoDelete = await getImageGalery({ title: 'imagen de galeria editada' });
		expect(photoDelete).toBe(null);
	});
});
describe('Operaciones con Manuales', async () => {
	it('Alta de un manuales', async () => {
		const manual = {
			title: 'Titulo del manual',
			url: '/doc/manual.docx'
		};

		const newManual = await createManual(manual);
		expect(newManual.title).toBe('Titulo del manual');
	});
	it('Modificar un manual', async () => {
		const manual = await getManual({ title: 'Titulo del manual' });
		const newManual = await updateManual(manual._id, {
			title: 'Titulo del manual modificado'
		});
		expect(newManual.title).toBe('Titulo del manual modificado');
	});
	it('Baja de un manual', async () => {
		const manual = await getManual({ title: 'Titulo del manual modificado' });
		await deleteManual(manual._id);
		const manualDelete = await getManual({ title: 'Titulo del manual modificado' });
		expect(manualDelete).toBe(null);
	});
});
