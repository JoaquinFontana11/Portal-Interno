import { json } from '@sveltejs/kit';
import { deletePage, updatePage } from '$lib/server/db/db';

export async function DELETE({ params }) {
	const page = await deletePage(params.id);
	return json({
		status: '200',
		page
	});
}

export async function PATCH({ request, params }) {
	const data = await request.json();

	const page = await updatePage(params.id, data);
	return json({
		status: '200',
		page
	});
}
