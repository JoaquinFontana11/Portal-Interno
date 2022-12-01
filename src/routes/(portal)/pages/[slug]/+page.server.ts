import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async ({ params }) => {
	const page = await dbOpeartions.pages.getOne({ slug: `/pages/${params.slug}` });
	return { page: JSON.stringify(page) };
};
