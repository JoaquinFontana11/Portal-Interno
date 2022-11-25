<script lang="ts">
	import type { PageData } from './$types';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';

	export let data: PageData;

	const deleteMenu = (e: CustomEvent) => {
		console.log(e.detail);
	};
	const modifyMenu = (e: CustomEvent) => {
		console.log(e.detail);
	};

	const deleteSubmenu = (e: CustomEvent) => {
		console.log(e.detail);
	};
	const modifySubmenu = (e: CustomEvent) => {
		console.log(e.detail);
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminList
			headers={['Nombre', 'Pagina', 'Orden', 'Activo']}
			attributes={['name', 'slug', 'order', 'active']}
			data={JSON.parse(data.menus).map((menu) => {
				menu.slug = menu.Page?.slug || 'no asociado';
				return menu;
			})}
			on:delete-doc={deleteMenu}
			on:modify-doc={modifyMenu}
			caption="Menus"
			actions={['delete', 'edit']}
		/>
		<br />
		<AdminList
			headers={['Nombre', 'Pagina', 'Padre', 'Orden', 'Activo']}
			attributes={['name', 'slug', 'parent', 'order', 'active']}
			data={JSON.parse(data.submenus).map((submenu) => {
				submenu.slug = submenu.Page?.slug || 'no asociado';
				submenu.parent = submenu.Menu?.name || 'no asociado';
				return submenu;
			})}
			on:delete-doc={deleteSubmenu}
			on:modify-doc={modifySubmenu}
			caption="Submenus"
			actions={['delete', 'edit']}
		/>
	</div>
</main>
