import { getUser } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request }) {
	const user = await getUser({ username: JSON.parse(request.user).username });

	return {
		user: JSON.stringify(user)
	};
}
