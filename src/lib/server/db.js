import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import User from './models/userModel';
import Image from './models/imageModel';
import Page from './models/pageModel';
import Menu from './models/menuModel';
import SubMenu from './models/submenuModel';
import Question from './models/preguntaModel';

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
	return async (data, id) => {
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
export const getUser = getOne(User);
export const getAllUser = getAll(User);
export const createUser = createOne(User);
export const deleteUser = deleteOne(User);
export const updateUser = updateOne(User);

// CRUD Imagenes
export const getImage = getOne(Image);
export const getAllImage = getAll(Image);
export const createImage = createOne(Image);
export const deleteImage = deleteOne(Image);
export const updateImage = updateOne(Image);

// CRUD Paginas / Novedades
export const getPage = getOne(Page);
export const createPage = createOne(Page);
export const deletePage = deleteOne(Page);
export const updatePage = updateOne(Page);
export const getAllPage = async () => {
	const docs = await Page.find().populate({ path: 'questions' });
	return docs;
};

// CRUD Menus
export const getMenu = getOne(Menu);
export const getAllMenu = getAll(Menu);
export const createMenu = createOne(Menu);
export const deleteMenu = deleteOne(Menu);
export const updateMenu = updateOne(Menu);

// CRUD Sub-menus
export const getSubMenu = getOne(SubMenu);
export const getAllSubMenu = getAll(SubMenu);
export const createSubMenu = createOne(SubMenu);
export const deleteSubMenu = deleteOne(SubMenu);
export const updateSubMenu = updateOne(SubMenu);

// CRUD Preguntas frecuentes
export const getQuestion = getOne(Question);
export const getAllQuestion = getAll(Question);
export const createQuestion = createOne(Question);
export const deleteQuestion = deleteOne(Question);
export const updateQuestion = updateOne(Question);
