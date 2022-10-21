import { json } from '@sveltejs/kit';
import { createSubMenu } from '$lib/server/db/db';

export async function POST({ request }) {
	const data = await request.json();

	const submenu = await createSubMenu(data);
	return json({
		status: '200',
		submenu
	});
}
