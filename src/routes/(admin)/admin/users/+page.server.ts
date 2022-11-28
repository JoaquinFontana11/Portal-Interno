import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageLoad = async () => {
	const users = await dbOpeartions.users.getAll();
	return { users: JSON.stringify(users) };
};

export const actions: Actions = {
	create: dbActions.users.create,
	delete: dbActions.users.delete,
	update: dbActions.users.create
};
