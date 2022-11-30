import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const pages = await dbOpeartions.pages.getAll();
	const pagesProyects = [];
	pages.map((page) => {
		if (page.project) pagesProyects.push(page);
	});
	return { pages: JSON.stringify(pagesProyects) };
};
