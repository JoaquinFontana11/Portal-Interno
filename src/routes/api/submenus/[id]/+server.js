import { json } from '@sveltejs/kit';
import { deleteSubMenu, updateSubMenu } from '$lib/server/db/db';

export async function DELETE({ params }) {
	const submenu = await deleteSubMenu(params.id);
	return json({
		status: '200',
		submenu
	});
}

export async function PATCH({ request, params }) {
	const data = await request.json();

	const submenu = await updateSubMenu(params.id, data);
	return json({
		status: '200',
		submenu
	});
}
