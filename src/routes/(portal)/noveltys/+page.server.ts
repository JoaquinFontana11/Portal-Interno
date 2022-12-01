import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const noveltys = await dbOpeartions.noveltys.getAll();
	return { noveltys: JSON.stringify(noveltys) };
};
