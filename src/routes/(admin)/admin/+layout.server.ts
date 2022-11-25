import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '$env/static/private';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('jwt');
	const privateKey = JWT_PRIVATE_KEY as string;
	try {
		const decoded = jwt.verify(token, privateKey);
		console.log(decoded);
	} catch (err) {
		throw redirect(302, '/login');
	}
};
