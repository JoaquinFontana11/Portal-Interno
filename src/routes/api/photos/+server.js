import { json } from '@sveltejs/kit';
import { createImageGalery } from '$lib/server/db/db';

export async function POST({ request }) {
	const data = await request.json();

	const photo = await createImageGalery(data);
	return json({
		status: '200',
		photo
	});
}
