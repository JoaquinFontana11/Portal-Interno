<script lang="ts">
	import type { LayoutData } from './$types';
	import Navbar from '$lib/components/portal/Navbar.svelte';
	import Footer from '$lib/components/portal/Footer.svelte';

	export let data: LayoutData;

	const menus = JSON.parse(data.menus)
		.filter((menu) => menu.active)
		.map((menu) => {
			menu.submenus = menu.submenus
				?.filter((submenu) => submenu.active)
				.sort((submenu1, submenu2) => {
					return submenu1.order > submenu2.order ? 1 : -1;
				});
			menu.drop = false;
			return menu;
		});

	const linksFooter = [
		{
			title: 'titulo 1',
			links: [
				{
					name: 'link 1',
					href: '#'
				},
				{
					name: 'link 2',
					href: '#'
				}
			]
		},
		{
			title: 'titulo 2',
			links: [
				{
					name: 'link 1',
					href: '#'
				},
				{
					name: 'link 2',
					href: '#'
				}
			]
		},
		{
			title: 'titulo 3',
			links: [
				{
					name: 'link 1',
					href: '#'
				},
				{
					name: 'link 2',
					href: '#'
				}
			]
		}
	];
</script>

<Navbar
	menus={menus.sort((menu1, menu2) => {
		return menu1.order > menu2.order ? 1 : -1;
	})}
	user={JSON.parse(data.user)}
/>
<main class="min-h-screen min-w-screen z-10 bg-section">
	<slot />
</main>
<Footer links={linksFooter} />
