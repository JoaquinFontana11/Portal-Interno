import { json } from '@sveltejs/kit';
import { updateUser, deleteUser } from '$lib/server/db/db';

export async function PATCH({ request, params }) {
	const data = await request.json();

	const user = await updateUser(params.id, data);
	return json({
		status: '200',
		user
	});
}

export async function DELETE({ params }) {
	const user = await deleteUser(params.id);
	return json({
		status: '200',
		user
	});
}
