import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '$env/static/private';
import dbOpeartions from '$lib/server/db/db';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('jwt');
	const privateKey = JWT_PRIVATE_KEY as string;
	let decoded;

	try {
		decoded = jwt.verify(token, privateKey);
	} catch (err) {
		console.log('err', err);
		throw redirect(302, '/login');
	}

	const user = await dbOpeartions.users.getOne({ id: decoded.id });

	if (user.role != 'Admin')
		throw error(401, {
			message: 'No tenes los permisos para acceder a esta seccion 😮‍💨'
		});

	return {
		user: JSON.stringify(user)
	};
};
