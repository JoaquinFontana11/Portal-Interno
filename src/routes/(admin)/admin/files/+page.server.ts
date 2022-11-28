import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async () => {
	const files = await dbOpeartions.files.getAll();
	return { files: JSON.stringify(files) };
};

export const actions: Actions = {
	create: dbActions.files.create,
	delete: dbActions.files.delete
};
