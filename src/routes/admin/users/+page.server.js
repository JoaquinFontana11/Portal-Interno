import { getAllUser } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	const users = await getAllUser();

	return {
		users: JSON.stringify(users)
	};
}
