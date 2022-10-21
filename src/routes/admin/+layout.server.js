import { redirect } from '@sveltejs/kit';
import { getUser } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request }) {
	if (!request.user || !JSON.parse(request.user).rol == 'admin') {
		throw redirect(301, '/login');
	}
	const user = await getUser({ username: JSON.parse(request.user).username });
	return { user: JSON.stringify(user) };
}
