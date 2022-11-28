import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async () => {
	const announcements = await dbOpeartions.announcements.getAll();
	return { announcements: JSON.stringify(announcements) };
};

export const actions: Actions = {
	create: dbActions.announcements.create,
	delete: dbActions.announcements.delete,
	update: dbActions.announcements.create
};
