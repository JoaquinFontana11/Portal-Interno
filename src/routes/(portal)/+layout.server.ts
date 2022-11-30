import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '$env/static/private';

export const load: PageServerLoad = async ({ cookies }) => {
	let user;
	// chequeamos que el usuario este logeado
	const token = cookies.get('jwt');
	const privateKey = JWT_PRIVATE_KEY as string;

	try {
		const decoded = jwt.verify(token, privateKey);
		console.log(decoded);
		user = await dbOpeartions.users.getOne({ id: decoded.id });
	} catch (err) {
		throw redirect(302, '/login');
	}

	const AllSubmenus = await dbOpeartions.submenus.getAll();

	const menus = (await dbOpeartions.menus.getAll()).map((menu) => {
		const submenus: any[] = [];
		AllSubmenus.forEach((submenu) => {
			if (submenu.parent_id == menu.id) submenus.push(submenu);
		});
		if (submenus.length) menu.submenus = submenus;
		return menu;
	});
	return {
		menus: JSON.stringify(menus),
		user: JSON.stringify(user)
	};
};
