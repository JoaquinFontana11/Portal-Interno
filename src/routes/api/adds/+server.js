import { json } from '@sveltejs/kit';
import { createAd } from '$lib/server/db/db';

export async function POST({ request }) {
	const data = await request.json();

	const ad = await createAd(data);
	return json({
		status: '200',
		ad
	});
}
