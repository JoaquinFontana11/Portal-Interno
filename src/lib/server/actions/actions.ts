import type { Action } from './$types';
import { writeFileSync, statSync, unlinkSync } from 'fs';
import dbOpeartions from '$lib/server/db/db';

const factoryCreateAction =
	(model: string): Action =>
	async ({ request }) => {
		const data = [...(await request.formData())];
		const docData = {};
		data.forEach((e: { name: string; value: any }) => {
			docData[e[0]] = e[1];
		});
		console.log('--------- DATA ---------');
		console.log(data);
		console.log('--------- DOCDATA ---------');
		console.log(docData);
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

const deleteFileAction: Action = async ({ request }) => {
	const data = [...(await request.formData())];
	const file = await dbOpeartions.files.getOne({ id: data[0][1] });
	unlinkSync(`static/${file.url}`);

	await dbOpeartions.files.delete({ id: file.id });
};

const uploadImageAction: Action = async ({ request }) => {
	const data = [...(await request.formData())];

	console.log(data);

	const path = `/img/${new Date().getTime()}.png`;
	writeFileSync(`static${path}`, data[1][1], 'base64');

	await dbOpeartions.images.create({
		name: data[2][1],
		alt: data[0][1],
		url: path
	});
};

const deleteImageAction: Action = async ({ request }) => {
	const data = [...(await request.formData())];
	const image = await dbOpeartions.images.getOne({ id: data[0][1] });
	unlinkSync(`static/${image.url}`);

	await dbOpeartions.images.delete({ id: image.id });
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
		create: uploadImageAction,
		delete: deleteImageAction
	},
	pages: {
		create: factoryCreateAction('pages'),
		delete: factoryDeleteAction('pages'),
		update: factoryUpdateAction('pages')
	},
	files: {
		create: uploadFileAction,
		delete: deleteFileAction
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
	photos: {
		create: factoryCreateAction('photos'),
		delete: factoryDeleteAction('photos')
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
