import { json } from '@sveltejs/kit';
import { deleteArchivo, getArchivo } from '$lib/server/db/db';
import { unlinkSync } from 'fs';

export async function DELETE({ params }) {
	const file = await getArchivo({ _id: params.id });

	const realPath =
		process.env.NODE_ENV == 'production' ? './static' + file.url : 'static' + file.url;

	unlinkSync(realPath);
	await deleteArchivo(params.id);

	return json({
		status: '201'
	});
}
