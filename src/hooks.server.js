import cookie from 'cookie-parse';
import { jwtDecode } from './lib/server/auth/jwt';

// si el usuario esta logueado, agregamos su token a la request para las rutas protegidas
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	let cookies;
	if (event.request.headers.get('cookie')) {
		cookies = cookie.parse(event.request.headers.get('cookie'));
	}
	const token = cookies?.jwt;
	const decoded = token ? jwtDecode(token) : null;
	decoded ? (event.request.user = decoded.data) : '';

	console.log(decoded);

	const response = await resolve(event);
	return response;
}
