import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const announcements = await dbOpeartions.announcements.getAll();
	return { announcements: JSON.stringify(announcements) };
};
