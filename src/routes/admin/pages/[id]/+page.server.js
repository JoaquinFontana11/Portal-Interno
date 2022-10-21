import { getPage } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const page = await getPage({ _id: params.id });
	return { page: JSON.stringify(page) };
}
