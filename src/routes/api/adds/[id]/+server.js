import { json } from '@sveltejs/kit';
import { deleteAd, updateAd } from '$lib/server/db/db';

export async function DELETE({ params }) {
	const ad = await deleteAd(params.id);
	return json({
		status: '200',
		ad
	});
}

export async function PATCH({ request, params }) {
	const data = await request.json();

	const ad = await updateAd(params.id, data);
	return json({
		status: '200',
		ad
	});
}
