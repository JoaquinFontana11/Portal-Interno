import type { PageLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageLoad = async () => {
	const users = await dbOpeartions.users.getAll();
	return { users: JSON.stringify(users) };
};
