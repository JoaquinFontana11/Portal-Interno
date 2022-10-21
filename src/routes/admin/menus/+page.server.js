import { getAllMenu, getAllSubMenu, getAllPage } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	const menus = await getAllMenu();
	const submenus = await getAllSubMenu();
	const pages = await getAllPage();

	return {
		menus: JSON.stringify(menus),
		submenus: JSON.stringify(submenus),
		slugPages: JSON.stringify(
			pages.map((page) => {
				return { value: page.slug, name: page.title };
			})
		)
	};
}
