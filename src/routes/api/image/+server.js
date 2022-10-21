import sizeOf from 'image-size';
import { writeFileSync, unlinkSync } from 'fs';
import { json } from '@sveltejs/kit';
import { createImage, deleteImage, getImage } from '$lib/server/db/db';

import * as dotenv from 'dotenv';
dotenv.config();

export async function POST({ request }) {
	const data = await request.json();
	const file = data.image;
	const path = `/img/${data.path}/${new Date().getTime()}.png`;
	const realPath = process.env.NODE_ENV == 'production' ? './static' + path : 'static' + path;

	writeFileSync(realPath, file, 'base64');
	const { width, height } = sizeOf(realPath);

	try {
		const newImage = await createImage({ url: path, alt: data.alt, width, height });
		return json({
			status: '201',
			newImage
		});
	} catch (err) {
		throw err;
	}
}

// export async function DELETE({ request }) {
// 	const data = await request.json();
// 	const img = await getImage({ _id: data.id });

// 	unlinkSync(`static/${img.url}`);
// 	await deleteImage(data.id);

// 	return json({
// 		status: '202'
// 	});
// }
