import { redirect } from '@sveltejs/kit';
import { getUser, getAllMenuPopulated } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request }) {
	if (!request.user) {
		throw redirect(301, '/login');
	}
	let menus = await getAllMenuPopulated();
	console.log(menus);

	menus = menus.map((menu) => {
		console.log(menu);
		const menuFormated = {
			name: menu.menu.name,
			slug: menu.menu.slug,
			active: menu.menu.active,
			order: menu.menu.order
		};

		if (menu.submenus.length > 0) menuFormated.submenus = menu.submenus;
		return menuFormated;
	});
	const user = await getUser({ username: JSON.parse(request.user).username });
	return { user: JSON.stringify(user), menus: JSON.stringify(menus) };
}
