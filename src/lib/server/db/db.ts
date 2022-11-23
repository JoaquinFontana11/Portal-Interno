import { Sequelize, Model, Optional } from 'sequelize';

import connection from './connection';

import User from './models/UserModel';
import Image from './models/ImageModel';
import Page from './models/PageModel';
import Novelty from './models/NoveltyModel';
import Menu from './models/MenuModel';
import Submenu from './models/SubmenuModel';
import GalleryPhoto from './models/GalleryPhotoModel';
import Comment from './models/CommentModel';
import Announcement from './models/AnnouncementModel';
import UserCloseAnnouncement from './models/UserCloseAnnouncementModel';

const dbInit = async () => {
	try {
		// chequeamos la conexion con la base
		await connection.authenticate();
		// la pripiedad alter crea la tabla si esta no existe en la base, o la actualiza con las clumnas que faltan
		User.sync({ alter: true });
		Image.sync({ alter: true });
		Page.sync({ alter: true });
		Menu.sync({ alter: true });
		Submenu.sync({ alter: true });
		Novelty.sync({ alter: true });
		GalleryPhoto.sync({ alter: true });
		Comment.sync({ alter: true });
		Announcement.sync({ alter: true });
		UserCloseAnnouncement.sync({ alter: true });

		console.log('La conexion con la base fue un exito');
	} catch (err) {
		console.error('Hubo un error conectandose con la base: ', err);
	}
};

const pupulateAssociations = (doc, associations) => {
	doc = doc.dataValues;
	associations.forEach((entity) => {
		doc[entity] = doc[entity]?.dataValues || null;
	});
	return doc;
};

const createOne = (Model: any) => async (data: any) => {
	const newDoc = await Model.create(data);
	return newDoc.dataValues;
};

const deleteMany =
	(Model: any) =>
	async (where: any = null) => {
		const docsDeleted = await Model.destroy({
			where: where ? where : null,
			truncate: where ? false : true
		});
		return docsDeleted;
	};

const updateMany =
	(Model: any) =>
	async (data: any = {}, where: any = {}) => {
		let docsUpdated = await Model.update(data, { where: where });
		return docsUpdated[0];
	};

// RelationModel: objeto o arreglo con objetos con los modelos para mapear en las FK
const getAll =
	(Model: any, RelationModel: any = null, associations: string[] = []) =>
	async (where: any = {}) => {
		const allDocs = await Model.findAll({ where: where, include: RelationModel });
		return allDocs.map((doc) => {
			return pupulateAssociations(doc, associations);
		});
	};
const getOne =
	(Model: any, RelationModel: any = null, associations: string[] = []) =>
	async (where: any = {}) => {
		const doc = await Model.findOne({ where: where, include: RelationModel });

		if (!doc) return {};

		return pupulateAssociations(doc, associations);
	};

export default dbInit;

export const dbOperations = {
	users: {
		create: createOne(User),
		delete: deleteMany(User),
		update: updateMany(User),
		getAll: getAll(User, Image, ['Image']),
		getOne: getOne(User, Image, ['Image'])
	},
	images: {
		create: createOne(Image),
		delete: deleteMany(Image),
		update: updateMany(Image),
		getAll: getAll(Image),
		getOne: getOne(Image)
	}
};
