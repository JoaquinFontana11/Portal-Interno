import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const galleryPhotos = await dbOpeartions.galleryPhotos.getAll();
	const images = await dbOpeartions.images.getAll();
	return {
		galleryPhotos: JSON.stringify(galleryPhotos),
		images: JSON.stringify(images)
	};
};
