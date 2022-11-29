<script lang="ts">
	import type { LayoutData } from './$types';
	import Navbar from '$lib/components/portal/Navbar.svelte';

	export let data: LayoutData;

	const menus = JSON.parse(data.menus)
		.filter((menu) => menu.active)
		.map((menu) => {
			menu.submenus = menu.submenus.filter((submenu) => submenu.active);
			menu.drop = false;
			return menu;
		});

	console.log(menus);
</script>

<!-- {menus} -->
<Navbar {menus} />
<slot />
