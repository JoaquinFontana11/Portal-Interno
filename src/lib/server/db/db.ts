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

// AssociatedModel: objeto o arreglo con objetos con los modelos para mapear en las FK
const getAll =
	(Model: any, AssociatedModel: any = null, associations: string[] = []) =>
	async (where: any = {}) => {
		const allDocs = await Model.findAll({ where: where, include: AssociatedModel });
		console.log(allDocs);
		return allDocs.map((doc) => {
			return pupulateAssociations(doc, associations);
		});
	};
const getOne =
	(Model: any, AssociatedModel: any = null, associations: string[] = []) =>
	async (where: any = {}) => {
		const doc = await Model.findOne({ where: where, include: AssociatedModel });

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
	},
	pages: {
		create: createOne(Page),
		delete: deleteMany(Page),
		update: updateMany(Page),
		getAll: getAll(Page),
		getOne: getOne(Page)
	},
	files: {
		create: createOne(File),
		delete: deleteMany(File),
		update: updateMany(File),
		getAll: getAll(File),
		getOne: getOne(File)
	},
	menus: {
		create: createOne(Menu),
		delete: deleteMany(Menu),
		update: updateMany(Menu),
		getAll: getAll(Menu, Page, ['Page']),
		getOne: getOne(Menu, Page, ['Page'])
	},
	submenus: {
		create: createOne(Submenu),
		delete: deleteMany(Submenu),
		update: updateMany(Submenu),
		getAll: getAll(Submenu, [Page, Menu], ['Page', 'Menu']),
		getOne: getOne(Submenu, [Page, Menu], ['Page', 'Menu'])
	},
	noveltys: {
		create: createOne(Novelty),
		delete: deleteMany(Novelty),
		update: updateMany(Novelty),
		getAll: getAll(Novelty, [Page, Image], ['Page', 'Image']),
		getOne: getOne(Novelty, [Page, Image], ['Page', 'Image'])
	},
	announcements: {
		create: createOne(Announcement),
		delete: deleteMany(Announcement),
		update: updateMany(Announcement),
		getAll: getAll(Announcement),
		getOne: getOne(Announcement)
	},
	galleryPhotos: {
		create: createOne(GalleryPhoto),
		delete: deleteMany(GalleryPhoto),
		update: updateMany(GalleryPhoto),
		getAll: getAll(GalleryPhoto, Image, ['Image']),
		getOne: getOne(GalleryPhoto, Image, ['Image'])
	},
	comments: {
		create: createOne(Comment),
		delete: deleteMany(Comment),
		update: updateMany(Comment),
		getAll: getAll(Comment, [User, GalleryPhoto], ['User', 'GalleryPhoto']),
		getOne: getOne(Comment, [User, GalleryPhoto], ['User', 'GalleryPhoto'])
	},
	announcementClosed: {
		create: createOne(UserCloseAnnouncement),
		delete: deleteMany(UserCloseAnnouncement),
		update: updateMany(UserCloseAnnouncement),
		getAll: getAll(UserCloseAnnouncement, [User, Announcement], ['User', 'Announcement']),
		getOne: getOne(UserCloseAnnouncement, [User, Announcement], ['User', 'Announcement'])
	}
};
