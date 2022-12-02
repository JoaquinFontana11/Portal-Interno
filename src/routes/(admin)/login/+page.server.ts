import { invalid, redirect } from '@sveltejs/kit';
import type { Actions, Action } from './$types';
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY, NODE_ENV } from '$env/static/private';
import dbOpeartions from '$lib/server/db/db';

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData();

	if (!data.get('username') || !data.get('password')) return invalid(400, { missing: true });

	const user = await dbOpeartions.users.getOne({
		username: data.get('username'),
		password: data.get('password')
	});

	if (!user) return invalid(400, { credentials: true });

	const privateKey = JWT_PRIVATE_KEY as string;
	const token = jwt.sign({ id: user.id }, privateKey, {
		expiresIn: '1h'
	});

	cookies.set('jwt', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: false, // NODE_ENV === 'production'
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, '/');
};

const logout: Action = async ({ cookies }) => {
	cookies.delete('jwt');
	throw redirect(302, '/login');
};

export const actions: Actions = {
	login,
	logout
};
