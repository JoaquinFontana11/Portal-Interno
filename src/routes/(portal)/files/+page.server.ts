import type { PageLoad } from './$types';
import dbOperations from '$lib/server/db/db';

export const load: PageLoad = async () => {
	const files = await dbOperations.files.getAll();
	return { files: JSON.stringify(files) };
};
