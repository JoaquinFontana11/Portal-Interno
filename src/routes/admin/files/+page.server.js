import { getAllArchivo } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	const files = await getAllArchivo();
	return { files: JSON.stringify(files) };
}
