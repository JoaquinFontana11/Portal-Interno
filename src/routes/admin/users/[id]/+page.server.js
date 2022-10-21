import { getUser } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request, params }) {
	let user;
	if (params.id == 'me') user = await getUser({ username: JSON.parse(request.user).username });
	else user = await getUser({ _id: params.id });

	return {
		user: JSON.stringify(user)
	};
}
