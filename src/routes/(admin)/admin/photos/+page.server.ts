import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async () => {
	const galleryPhotos = await dbOpeartions.photos.getAll();
	const images = await dbOpeartions.images.getAll();
	return {
		galleryPhotos: JSON.stringify(galleryPhotos),
		images: JSON.stringify(images)
	};
};

export const actions: Actions = {
	create: dbActions.photos.create,
	delete: dbActions.photos.delete
};
