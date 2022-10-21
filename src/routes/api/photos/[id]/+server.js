import { json } from '@sveltejs/kit';
import { deleteImageGalery, updateImageGalery } from '$lib/server/db/db';

export async function DELETE({ params }) {
	const photo = await deleteImageGalery(params.id);
	return json({
		status: '200',
		photo
	});
}

export async function PATCH({ request, params }) {
	const data = await request.json();

	const photo = await updateImageGalery(params.id, data);
	return json({
		status: '200',
		photo
	});
}
