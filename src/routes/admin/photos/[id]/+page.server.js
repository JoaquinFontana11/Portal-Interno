import { getImageGalery, getAllImage } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const photo = await getImageGalery({ _id: params.id });
	const images = await getAllImage();
	return { photo: JSON.stringify(photo), images: JSON.stringify(images) };
}
