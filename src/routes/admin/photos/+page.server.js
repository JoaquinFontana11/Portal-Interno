import { getAllImageGalery, getAllImage } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	const photos = await getAllImageGalery();
	const images = await getAllImage();
	return { photos: JSON.stringify(photos), images: JSON.stringify(images) };
}
