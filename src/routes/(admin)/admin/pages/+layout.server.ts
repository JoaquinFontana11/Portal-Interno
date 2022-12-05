import type { LayoutServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: LayoutServerLoad = async () => {
	const files = await dbOpeartions.files.getAll();
	const images = await dbOpeartions.images.getAll();
	return { files: JSON.stringify(files), images: JSON.stringify(images) };
};
