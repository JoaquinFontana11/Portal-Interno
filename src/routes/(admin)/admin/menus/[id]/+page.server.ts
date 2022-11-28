import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async ({ params }) => {
	const menu = await dbOpeartions.menus.getOne({ id: params.id });
	const menus = await dbOpeartions.menus.getAll();
	const submenu = await dbOpeartions.submenus.getOne({ id: params.id });
	const pages = await dbOpeartions.pages.getAll();
	return {
		menu: JSON.stringify(menu),
		menus: JSON.stringify(menus),
		submenu: JSON.stringify(submenu),
		pages: JSON.stringify(pages)
	};
};

export const actions: Actions = {
	updateMenu: dbActions.menus.update,
	updateSubmenu: dbActions.submenus.update
};
