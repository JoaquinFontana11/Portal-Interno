import type { PageServerLoad } from './$types';
import dbOperations from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const images = await dbOperations.images.getAll();
	const pages = await dbOperations.pages.getAll();
	const noveltys = await dbOperations.noveltys.getAll();
	return { images: JSON.stringify(images), pages: JSON.stringify(pages),noveltys: JSON.stringify(noveltys) };
};
