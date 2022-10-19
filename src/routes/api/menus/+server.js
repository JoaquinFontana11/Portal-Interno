import { json } from '@sveltejs/kit';
import { createMenu } from '$lib/server/db/db';

export async function POST({ request }) {
	const data = await request.json();

	const menu = await createMenu(data);
	return json({
		status: '200',
		menu
	});
}
