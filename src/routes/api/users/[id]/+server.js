import { json } from '@sveltejs/kit';
import { updateUser } from '$lib/server/db/db';

export async function PATCH({ request, params }) {
	const data = await request.json();

	const user = await updateUser(params.id, data);
	return json({
		status: '200',
		user
	});
}
