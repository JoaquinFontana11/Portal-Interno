import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const photos = await dbOpeartions.photos.getAll();
	return { photos: JSON.stringify(photos) };
};
