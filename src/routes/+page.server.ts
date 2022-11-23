import type { PageServerLoad } from './$types';
import initDB from '$lib/server/db/db';
import { createUser, allUsers } from '$lib/server/db/db';

export const load: PageServerLoad = async ({ params }) => {
	await initDB();

	// console.log(createUser);
	// const newUser = await createUser({
	// 	name: 'test',
	// 	lastname: 'test',
	// 	username: 'test',
	// 	email: 'test@test.com',
	// 	role: 'test-role',
	// 	photo_id: 1
	// });
	// console.log(newUser);

	const users = await allUsers();

	console.log(
		users.map((user) => {
			user = user.dataValues;
			user.Image = user.Image?.dataValues || null;
			return user;
		})
	);
};
