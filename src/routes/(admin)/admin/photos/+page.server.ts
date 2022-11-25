import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const galleryPhotos = await dbOpeartions.galleryPhotos.getAll();
	return { galleryPhotos: JSON.stringify(galleryPhotos) };
};
