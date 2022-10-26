import { getAd } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const ad = await getAd({ _id: params.id });
	return { ad: JSON.stringify(ad) };
}
