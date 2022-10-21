import { getAllImage } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	const images = await getAllImage();
	return { images: JSON.stringify(images) };
}
