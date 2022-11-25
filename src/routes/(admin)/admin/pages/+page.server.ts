import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const pages = await dbOpeartions.pages.getAll();
	return { pages: JSON.stringify(pages) };
};
