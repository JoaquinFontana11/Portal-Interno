import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async () => {
	const pages = await dbOpeartions.pages.getAll();
	const pagesProyects = [];
	pages.map((page) => {
		if (page.project) pagesProyects.push(page);
	});
	console.log('PAGINAS');
	console.log(pagesProyects);
	return { pages: JSON.stringify(pagesProyects) };
};
