import { json } from '@sveltejs/kit';
import { jwtSign } from '$lib/server/auth/jwt';
import { getUser } from '$lib/server/db/db';
// import samesite from '$lib/server/auth/cookie';
import * as dotenv from 'dotenv';
dotenv.config();

export async function POST({ request }) {
	const data = await request.json();
	const user = await getUser({ username: data.username, password: data.password });

	if (!user) {
		const res = new Response(
			JSON.stringify({
				message: 'el nombre de usuario o contraseña son incorrectos'
			}),
			{
				status: 401
			}
		);

		return res;
	}

	// ponemos como fecha de expiracion de aca a un año
	let date = new Date();
	date.setFullYear(2023);

	const samesite = process.env.NODE_ENV == 'production' ? ';SameSite=None' : '';
	const httponly = process.env.NODE_ENV == 'production' ? '' : ';httponly;;';

	const cookieHeader =
		process.env.NODE_ENV == 'production'
			? `expires=${date};httponly;path=/;`
			: `expires=${date};httponly;path=/;secure;`;

	const res = new Response(
		JSON.stringify({
			name: 'loggin exitoso'
		}),
		{
			headers: {
				'Set-Cookie': `jwt=${await jwtSign({
					username: user.username,
					rol: user.rol
				})};${cookieHeader}`
			}
		}
	);
	return res;
}

export async function GET({ request }) {
	return new Response('ok');
}
