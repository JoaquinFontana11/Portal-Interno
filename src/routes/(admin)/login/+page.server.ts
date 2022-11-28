import { invalid, redirect } from '@sveltejs/kit';
import type { Actions, Action } from './$types';
import jwt from 'jsonwebtoken';
import { USER_APP, PASSWORD, JWT_PRIVATE_KEY, NODE_ENV } from '$env/static/private';

console.log(USER_APP, PASSWORD, JWT_PRIVATE_KEY, NODE_ENV);
console.log(process.env);

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData();

	console.log(data.get('username'), data.get('password'));
	console.log(USER_APP, PASSWORD);

	if (!data.get('username') || !data.get('password')) return invalid(400, { missing: true });

	if (data.get('username') != USER_APP || data.get('password') != PASSWORD)
		return invalid(400, { credentials: true });

	const privateKey = JWT_PRIVATE_KEY as string;
	const token = jwt.sign({ user: USER_APP }, privateKey, {
		expiresIn: '1h'
	});

	cookies.set('jwt', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, '/admin');
};

export const actions: Actions = {
	login
};
