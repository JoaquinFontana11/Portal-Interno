import { writeFileSync, unlinkSync } from 'fs';
import { json } from '@sveltejs/kit';
import { createArchivo } from '$lib/server/db/db';

import * as dotenv from 'dotenv';
dotenv.config();

export async function POST({ request }) {
	const data = await request.json();
	const file = data.file;
	const type = data.type;
	const extension = data.name.split('.').at(-1);

	const path = `/${type}/${new Date().getTime()}.${extension}`;
	const realPath = process.env.NODE_ENV == 'production' ? './static' + path : 'static' + path;

	writeFileSync(realPath, file, 'base64');

	try {
		const newFile = await createArchivo({ name: data.name, type, url: path });
		return json({
			status: '201',
			newFile
		});
	} catch (err) {
		throw err;
	}
}
