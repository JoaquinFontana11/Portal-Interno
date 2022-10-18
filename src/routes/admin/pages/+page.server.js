import { getAllPage } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const pages = await getAllPage();
	console.log(params);
	return { pages: JSON.stringify(pages) };
}
