import { redirect } from '@sveltejs/kit';
import { getAllImage, getUser } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request }) {
	if (!request.user || !JSON.parse(request.user).rol == 'admin') {
		throw redirect(301, '/login');
	}
	const images = await getAllImage();
	const user = await getUser({ username: JSON.parse(request.user).username });
	return { images: JSON.stringify(images), user: JSON.stringify(user) };
}
