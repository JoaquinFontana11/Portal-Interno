import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const menus = await dbOpeartions.menus.getAll();
	const submenus = await dbOpeartions.submenus.getAll();
	return { menus: JSON.stringify(menus), submenus: JSON.stringify(submenus) };
};
