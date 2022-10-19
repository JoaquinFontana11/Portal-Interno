import { redirect } from '@sveltejs/kit';
import { getAllImage } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request }) {
	if (!request.user || !JSON.parse(request.user).rol == 'admin') {
		throw redirect(301, '/login');
	}
	const images = await getAllImage();
	return { images: JSON.stringify(images) };
}
