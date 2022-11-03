import { getAllImage, getAllArchivo } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	const images = await getAllImage();
	const files = await getAllArchivo();
	return { images: JSON.stringify(images), files: JSON.stringify(files) };
}
