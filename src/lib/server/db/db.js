import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import Page from './models/PaginaModel';
import User from './models/UsuarioModel';
import Image from './models/ImagenModel';
import ImageGalery from './models/FotoModel';
import Menu from './models/MenuModel';
import SubMenu from './models/SubmenuModel';
import Question from './models/PreguntaFrecuenteModel';
import Ad from './models/AnuncioModel';
import Comment from './models/ComentarioModel';
import Archivo from './models/ArchivoModel';
// import Video from './models/VideoModel';
import Project from './models/ProyectoModel';

dotenv.config();

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('La conexion con la base de datos fue exitosa');
});

const getOne = (Model) => {
	return async (id) => {
		const doc = await Model.findById(id);

		if (!doc) throw new Error('No se encontro el documento');

		return doc;
	};
};

const getOneFilter = (Model) => {
	return async (query) => {
		const doc = await Model.findOne(query);
		return doc;
	};
};

const getAll = (Model) => {
	return async () => {
		const docs = await Model.find();
		return docs;
	};
};

const createOne = (Model) => {
	return async (data) => {
		const doc = await Model.create(data);
		return doc;
	};
};

const updateOne = (Model) => {
	return async (id, data) => {
		const doc = await Model.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true
		});
		return doc;
	};
};

const deleteOne = (Model) => {
	return async (id) => {
		const doc = await Model.findByIdAndDelete(id);
		return '';
	};
};

// CRUD Usuarios
export const getUser = getOneFilter(User);
export const getAllUser = getAll(User);
export const createUser = createOne(User);
export const deleteUser = deleteOne(User);
export const updateUser = updateOne(User);

// CRUD Imagenes
export const getImage = getOneFilter(Image);
export const getAllImage = getAll(Image);
export const createImage = createOne(Image);
export const deleteImage = deleteOne(Image);
export const updateImage = updateOne(Image);

// CRUD Imagenes galeria
export const getImageGalery = getOneFilter(ImageGalery);
export const getAllImageGalery = getAll(ImageGalery);
export const createImageGalery = createOne(ImageGalery);
export const deleteImageGalery = deleteOne(ImageGalery);
export const updateImageGalery = updateOne(ImageGalery);

// CRUD Paginas / Novedades
// export const getPage = getOneFilter(Page);
export const createPage = createOne(Page);
export const deletePage = deleteOne(Page);
export const updatePage = updateOne(Page);
export const getAllPage = async () => {
	const docs = await Page.find().populate({ path: 'questions' });
	return docs;
};
export const getPage = async (query) => {
	const docs = await Page.findOne(query).populate({ path: 'questions' });
	return docs;
};

// CRUD Menus
export const getMenu = getOneFilter(Menu);
export const getAllMenu = getAll(Menu);
export const createMenu = createOne(Menu);
export const deleteMenu = deleteOne(Menu);
export const updateMenu = updateOne(Menu);
export const getAllMenuPopulated = async () => {
	const menus = await Menu.find();
	const submenus = await SubMenu.find();

	menus.map((menu) => {
		const submenusArr = [];
		submenus.forEach((submenu) => {
			if (submenu.parent == menu._id) submenusArr.push(submenu);
		});
		menu.submenus = submenusArr;
		return menu;
	});
	return menus;
};
export const getOneMenuPopulated = async (id) => {
	const menu = await Menu.findById(id);
	const submenus = await SubMenu.find();

	const submenusArr = [];
	submenus.forEach((submenu) => {
		if (submenu.parent.toString() == menu._id.toString()) submenusArr.push(submenu);
	});
	menu.submenus = submenusArr;

	return menu;
};

// CRUD Sub-menus
export const getSubMenu = getOneFilter(SubMenu);
export const getAllSubMenu = getAll(SubMenu);
export const createSubMenu = createOne(SubMenu);
export const deleteSubMenu = deleteOne(SubMenu);
export const updateSubMenu = updateOne(SubMenu);

// CRUD Preguntas frecuentes
export const getQuestion = getOneFilter(Question);
export const getAllQuestion = getAll(Question);
export const createQuestion = createOne(Question);
export const deleteQuestion = deleteOne(Question);
export const updateQuestion = updateOne(Question);

// CRUD Anuncios
export const getAd = getOneFilter(Ad);
export const getAllAd = getAll(Ad);
export const createAd = createOne(Ad);
export const deleteAd = deleteOne(Ad);
export const updateAd = updateOne(Ad);

// CRUD Comentarios
export const getComment = getOneFilter(Comment);
export const getAllComment = getAll(Comment);
export const createComment = createOne(Comment);
export const deleteComment = deleteOne(Comment);
export const updateComment = updateOne(Comment);

// CRUD Archivos
export const getArchivo = getOneFilter(Archivo);
export const getAllArchivo = getAll(Archivo);
export const createArchivo = createOne(Archivo);
export const deleteArchivo = deleteOne(Archivo);
export const updateArchivo = updateOne(Archivo);

// CRUD Videos
// export const getVideo = getOneFilter(Video);
// export const getAllVideo = getAll(Video);
// export const createVideo = createOne(Video);
// export const deleteVideo = deleteOne(Video);
// export const updateVideo = updateOne(Video);

// CRUD Proyectos
export const getProject = getOneFilter(Project);
export const getAllProject = getAll(Project);
export const createProject = createOne(Project);
export const deleteProject = deleteOne(Project);
export const updateProject = updateOne(Project);
