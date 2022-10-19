import { getMenu, getAllPage } from '$lib/server/db/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const menu = await getMenu({ _id: params.id });
	const pages = await getAllPage();

	return {
		menu: JSON.stringify(menu),
		slugPages: JSON.stringify(
			pages.map((page) => {
				return { value: page.slug, name: page.title };
			})
		)
	};
}
