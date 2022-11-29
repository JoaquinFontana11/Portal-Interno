import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async () => {
	const images = await dbOpeartions.images.getAll();
	return { images: JSON.stringify(images) };
};

export const actions: Actions = {
	create: dbActions.images.create,
	delete: dbActions.images.delete
};
