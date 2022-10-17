import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ request }) {
	console.log('Usuario registrado: ', JSON.parse(request.user));
	if (!request.user || !JSON.parse(request.user).rol == 'admin') {
		throw redirect(301, '/login');
	}
	return;
}
