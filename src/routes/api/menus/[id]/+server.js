import { json } from '@sveltejs/kit';
import { deleteMenu, updateMenu } from '$lib/server/db/db';

export async function DELETE({ params }) {
	const menu = await deleteMenu(params.id);
	return json({
		status: '200',
		menu
	});
}

export async function PATCH({ request, params }) {
	const data = await request.json();

	const menu = await updateMenu(params.id, data);
	return json({
		status: '200',
		menu
	});
}
