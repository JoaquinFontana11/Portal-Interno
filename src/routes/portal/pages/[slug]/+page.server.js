import { getPage } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	console.log(params);
	const page = await getPage({ slug: '/portal/pages/' + params.slug });
	return { page: JSON.stringify(page) };
}
