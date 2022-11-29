import type { Action } from './$types';
import { writeFileSync, statSync } from 'fs';
import dbOpeartions from '$lib/server/db/db';

const factoryCreateAction =
	(model: string): Action =>
	async ({ request }) => {
		const data = [...(await request.formData())];
		const docData = {};
		data.forEach((e: { name: string; value: any }) => {
			docData[e[0]] = e[1];
		});
		await dbOpeartions[model].create(docData);
	};

const factoryUpdateAction =
	(model: string): Action =>
	async ({ request }) => {
		const data = [...(await request.formData())];
		const docData = {};
		let id: number = 0;
		data.forEach((e: { name: string; value: any }) => {
			if (e[0] == 'id') return (id = e[1]);
			docData[e[0]] = e[1];
		});
		await dbOpeartions[model].update(docData, { id: id });
	};

const factoryDeleteAction =
	(model: string): Action =>
	async ({ request }) => {
		const data = [...(await request.formData())].flat();
		await dbOpeartions[model].delete({ id: data[1] });
	};

const uploadFileAction: Action = async ({ request }) => {
	const data = [...(await request.formData())];
	const extension = data[2][1].split('.').at(-1);

	const path = `/files/${new Date().getTime()}.${extension}`;
	writeFileSync(`static${path}`, data[1][1], 'base64');

	await dbOpeartions.files.create({
		name: data[2][1],
		description: data[0][1],
		url: path
	});
};

const dbActions = {
	announcements: {
		create: factoryCreateAction('announcements'),
		delete: factoryDeleteAction('announcements'),
		update: factoryUpdateAction('announcements')
	},
	users: {
		create: factoryCreateAction('users'),
		delete: factoryDeleteAction('users'),
		update: factoryUpdateAction('users')
	},
	images: {
		create: factoryCreateAction('images'), // TODO: agregar la logica de guardado del archivo
		delete: factoryDeleteAction('images')
	},
	pages: {
		create: factoryCreateAction('pages'),
		delete: factoryDeleteAction('pages'),
		update: factoryUpdateAction('pages')
	},
	files: {
		create: uploadFileAction,
		delete: factoryDeleteAction('files')
	},
	menus: {
		create: factoryCreateAction('menus'),
		delete: factoryDeleteAction('menus'),
		update: factoryUpdateAction('menus')
	},
	submenus: {
		create: factoryCreateAction('submenus'),
		delete: factoryDeleteAction('submenus'),
		update: factoryUpdateAction('submenus')
	},
	noveltys: {
		create: factoryCreateAction('noveltys'),
		delete: factoryDeleteAction('noveltys'),
		update: factoryUpdateAction('noveltys')
	},
	galleryPhotos: {
		create: factoryCreateAction('galleryPhotos'),
		delete: factoryDeleteAction('galleryPhotos'),
		update: factoryUpdateAction('galleryPhotos')
	},
	comments: {
		create: factoryCreateAction('comments'),
		delete: factoryDeleteAction('comments'),
		update: factoryUpdateAction('comments')
	},
	announcementClosed: {
		create: factoryCreateAction('announcementClosed'),
		delete: factoryDeleteAction('announcementClosed'),
		update: factoryUpdateAction('announcementClosed')
	}
};

export default dbActions;
