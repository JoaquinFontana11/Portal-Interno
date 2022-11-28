import type { PageServerLoad } from './$types';
import dbOperations from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const images = await dbOperations.images.getAll();
	console.log('BDD0');
	console.log(images);
	return { images: JSON.stringify(images) };
};
