import { json } from '@sveltejs/kit';
import { createUser } from '$lib/server/db/db';

export async function POST({ request }) {
	const data = await request.json();

	const user = await createUser(data);
	return json({
		status: '200',
		user
	});
}
