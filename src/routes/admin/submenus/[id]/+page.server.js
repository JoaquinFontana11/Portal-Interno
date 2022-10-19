import { getSubMenu, getAllPage, getAllMenu } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const menus = await getAllMenu();
	const submenu = await getSubMenu({ _id: params.id });
	const pages = await getAllPage();

	return {
		menus: JSON.stringify(menus),
		submenu: JSON.stringify(submenu),
		slugPages: JSON.stringify(
			pages.map((page) => {
				return { value: page.slug, name: page.title };
			})
		)
	};
}
