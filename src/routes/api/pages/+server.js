import { json } from '@sveltejs/kit';
import { createPage } from '$lib/server/db/db';

export async function POST({ request }) {
	const data = await request.json();

	const page = await createPage(data);
	return json({
		status: '200',
		page
	});
}
