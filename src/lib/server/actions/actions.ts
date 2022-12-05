import type { Action } from './$types';
import { writeFileSync, statSync, unlinkSync } from 'fs';
import dbOperations from '$lib/server/db/db';
import { NODE_ENV } from '$env/static/private';

const factoryCreateAction =
	(model: string): Action =>
	async ({ request }) => {
		const data = [...(await request.formData())];
		const docData = {};
		data.forEach((e: { name: string; value: any }) => {
			docData[e[0]] = e[1];
		});
		await dbOperations[model].create(docData);
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
		await dbOperations[model].update(docData, { id: id });
	};

const factoryDeleteAction =
	(model: string): Action =>
	async ({ request }) => {
		const data = [...(await request.formData())].flat();
		await dbOperations[model].delete({ id: data[1] });
	};

const uploadFileAction: Action = async ({ request }) => {
	const data = [...(await request.formData())];
	const extension = data[3][1].split('.').at(-1);

	const path = `/files/${new Date().getTime()}.${extension}`;
	writeFileSync(`${NODE_ENV == 'production' ? 'client' : 'static'}${path}`, data[2][1], 'base64');
	console.log(data);

	await dbOperations.files.create({
		name: data[3][1],
		description: data[0][1],
		group: data[1][1],
		url: path
	});
};

const deleteFileAction: Action = async ({ request }) => {
	const data = [...(await request.formData())];
	const file = await dbOperations.files.getOne({ id: data[0][1] });
	unlinkSync(`${NODE_ENV == 'production' ? 'client' : 'static'}/${file.url}`);

	await dbOperations.files.delete({ id: file.id });
};

const uploadImageAction: Action = async ({ request }) => {
	const data = [...(await request.formData())];

	const path = `/img/${new Date().getTime()}.png`;
	writeFileSync(`${NODE_ENV == 'production' ? 'client' : 'static'}${path}`, data[1][1], 'base64');

	await dbOperations.images.create({
		name: data[2][1],
		alt: data[0][1],
		url: path
	});
};

const deleteImageAction: Action = async ({ request }) => {
	const data = [...(await request.formData())];
	const image = await dbOperations.images.getOne({ id: data[0][1] });
	unlinkSync(`${NODE_ENV == 'production' ? 'client' : 'static'}${image.url}`);

	await dbOperations.images.delete({ id: image.id });
};

const uploadUserPhotoAction: Action = async ({ request }) => {
	const data = [...(await request.formData())];

	const user = await dbOperations.users.getOne({ id: data[3][1] });
	// Borramos la foto anterior del usuario (si tiene)
	if (user.Image) {
		try {
			unlinkSync(`${NODE_ENV == 'production' ? 'client' : 'static'}${user.Image.url}`);
		} catch (err) {
			console.log('La foto del usuario se elimino manualmente');
		}
		await dbOperations.images.delete({ id: user.Image.id });
	}
	// Creamos la nueva foto
	const path = `/img/${user.id}-${new Date().getTime()}.png`;
	writeFileSync(`${NODE_ENV == 'production' ? 'client' : 'static'}${path}`, data[1][1], 'base64');

	const newImage = await dbOperations.images.create({
		name: data[2][1],
		alt: data[0][1],
		url: path
	});

	// Asignamos la foto al usuario
	await dbOperations.users.update({ photo_id: newImage.id }, { id: user.id });
};

// const createCommentAction: Action = async ({ request }) => {
// 	const data = [...(await request.formData())];
// 	console.log(data);

// 	await dbOperations.comments.create({
// 		content
// 	})
// };

const dbActions = {
	announcements: {
		create: factoryCreateAction('announcements'),
		delete: factoryDeleteAction('announcements'),
		update: factoryUpdateAction('announcements')
	},
	users: {
		create: factoryCreateAction('users'),
		delete: factoryDeleteAction('users'),
		update: factoryUpdateAction('users'),
		uploadPhoto: uploadUserPhotoAction
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
		delete: factoryDeleteAction('comments')
	},
	likes: {
		create: factoryCreateAction('likes'),
		delete: factoryDeleteAction('likes')
	},
	announcementClosed: {
		create: factoryCreateAction('announcementClosed'),
		delete: factoryDeleteAction('announcementClosed'),
		update: factoryUpdateAction('announcementClosed')
	}
};

export default dbActions;
