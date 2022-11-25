import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const images = await dbOpeartions.images.getAll();
	return { images: JSON.stringify(images) };
};
