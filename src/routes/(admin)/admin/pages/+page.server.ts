import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async () => {
	const pages = await dbOpeartions.pages.getAll();
	return { pages: JSON.stringify(pages) };
};

export const actions: Actions = {
	create: dbActions.pages.create,
	delete: dbActions.pages.delete
};
