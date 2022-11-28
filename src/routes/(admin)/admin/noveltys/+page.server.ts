import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async () => {
	const noveltys = await dbOpeartions.noveltys.getAll();
	const pages = await dbOpeartions.pages.getAll();
	const images = await dbOpeartions.images.getAll();
	return {
		noveltys: JSON.stringify(noveltys),
		pages: JSON.stringify(pages),
		images: JSON.stringify(images)
	};
};

export const actions: Actions = {
	create: dbActions.noveltys.create,
	delete: dbActions.noveltys.delete,
	update: dbActions.noveltys.create
};
