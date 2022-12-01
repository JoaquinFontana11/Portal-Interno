import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async ({ params }) => {
	const novelty = await dbOpeartions.noveltys.getOne({ id: params.id });
	return { novelty: JSON.stringify(novelty) };
};
