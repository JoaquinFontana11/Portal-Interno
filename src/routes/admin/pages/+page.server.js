import { getAllPage } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	const pages = await getAllPage();
	return { pages: JSON.stringify(pages) };
}
