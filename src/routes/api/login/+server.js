import { json } from '@sveltejs/kit';
import { jwtSign } from '$lib/server/auth/jwt';
import { getUser } from '$lib/server/db/db';

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

	const res = new Response(
		JSON.stringify({
			name: 'loggin exitoso'
		}),
		{
			headers: {
				'Set-Cookie': `jwt=${await jwtSign({
					username: user.username,
					rol: user.rol
				})};expires=${date};httponly;path=/;secure`
			}
		}
	);
	return res;
}

export async function GET({ request }) {
	return new Response('ok');
}
