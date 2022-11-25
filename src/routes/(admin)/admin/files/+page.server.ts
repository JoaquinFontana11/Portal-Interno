import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const files = await dbOpeartions.files.getAll();
	return { files: JSON.stringify(files) };
};
