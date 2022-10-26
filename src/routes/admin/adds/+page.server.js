import { getAllAd } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	const ads = await getAllAd();
	return { ads: JSON.stringify(ads) };
}
