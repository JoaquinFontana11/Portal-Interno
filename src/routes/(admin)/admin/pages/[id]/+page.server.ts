import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async ({ params }) => {
	const page = await dbOpeartions.pages.getOne({ id: params.id });
	return { page: JSON.stringify(page) };
};

export const actions: Actions = {
	update: dbActions.pages.update
};
