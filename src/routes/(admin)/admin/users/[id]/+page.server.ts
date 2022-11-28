import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async ({ params }) => {
	const user = await dbOpeartions.users.getOne({ id: params.id });
	return { user: JSON.stringify(user) };
};

export const actions: Actions = {
	update: dbActions.users.update
};
