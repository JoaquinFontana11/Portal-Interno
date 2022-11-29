import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async ({ params }) => {
	const novelty = await dbOpeartions.noveltys.getOne({ id: params.id });
	const pages = await dbOpeartions.pages.getAll();
	const images = await dbOpeartions.images.getAll();
	return {
		novelty: JSON.stringify(novelty),
		pages: JSON.stringify(pages),
		images: JSON.stringify(images)
	};
};

export const actions: Actions = {
	update: dbActions.noveltys.update
};
