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
	console.log(data);
	const extension = data[1][1].name.split('.').at(-1);

	// Subimos el archivo al servidor
	const reader = new FileReader(); // FILEREADER ES DEL CLIENT; NO DE NODE
	reader.readAsDataURL(data[1][1]);
	reader.onload = async (e) => {
		const target = e.target as FileReader;
		const fileReaderResult = target.result as string;
		const fileBase64 = fileReaderResult.split(',');

		const path = `/files/${new Date().getTime()}.${extension}`;

		writeFileSync(`static${path}`, fileBase64[1], 'base64');
	};
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
