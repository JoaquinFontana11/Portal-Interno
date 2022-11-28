import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async () => {
	const menus = await dbOpeartions.menus.getAll();
	const submenus = await dbOpeartions.submenus.getAll();
	const pages = await dbOpeartions.pages.getAll();
	return {
		menus: JSON.stringify(menus),
		submenus: JSON.stringify(submenus),
		pages: JSON.stringify(pages)
	};
};

export const actions: Actions = {
	createMenu: dbActions.menus.create,
	deleteMenu: dbActions.menus.delete,
	updateMenu: dbActions.menus.create,
	createSubmenu: dbActions.submenus.create,
	deleteSubmenu: dbActions.submenus.delete,
	updateSubmenu: dbActions.submenus.create
};
