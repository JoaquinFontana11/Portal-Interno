<script>
	import { Plus, Table } from 'svelte-hero-icons';
	import AdminForm from '$lib/components/AdminForm.svelte';
	import AdminList from '$lib/components/AdminList.svelte';
	import AdminButton from '$lib/components/AdminButton.svelte';
	// import AdminDrawer from '$lib/components/AdminDrawer.svelte';

	export let data;

	let loadingMenu = false;
	let loadingSubmenu = false;
	let list = true;

	const componentsMenus = [
		{
			type: 'text',
			label: 'Nombre del menu',
			name: 'name',
			value: '',
			required: true
		},
		{
			type: 'select',
			label: 'Slug del menu',
			name: 'slug',
			value: '',
			required: true,
			options: JSON.parse(data.slugPages)
		},
		{
			type: 'number',
			label: 'Orden del menu',
			name: 'order',
			value: 99
		},
		{
			type: 'select',
			label: 'Activo',
			name: 'active',
			value: true,
			options: [
				{ name: 'Si', value: true },
				{ name: 'No', value: false }
			]
		}
	];
	const componentsSubmenus = [
		{
			type: 'text',
			label: 'Nombre del submenu',
			name: 'name',
			value: '',
			required: true
		},
		{
			type: 'select',
			label: 'Slug del submenu',
			name: 'slug',
			value: '',
			required: true,
			options: JSON.parse(data.slugPages)
		},
		{
			type: 'number',
			label: 'Orden del submenu',
			name: 'order',
			value: 99
		},
		{
			type: 'select',
			label: 'Activo',
			name: 'active',
			value: true,
			options: [
				{ name: 'Si', value: true },
				{ name: 'No', value: false }
			]
		},
		{
			type: 'select',
			label: 'Menu padre',
			name: 'parent',
			value: '',
			options: JSON.parse(data.menus).map((menu) => {
				return { value: menu._id, name: menu.name };
			})
		}
	];

	const menuSubmit = async (e) => {
		console.log(e.detail);
		if (loadingMenu) return;

		loadingMenu = true;
		const { data } = e.detail;
		const body = {
			name: data[0].value,
			slug: data[1].value,
			order: data[2].value,
			active: data[3].value
		};

		try {
			await fetch(`/api/menus`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(body)
			});
		} catch (err) {
			console.log(err);
		} finally {
			loadingMenu = false;
		}
	};
	const submenuSubmit = async (e) => {
		if (loadingSubmenu) return;

		loadingSubmenu = true;
		const { data } = e.detail;
		const body = {
			name: data[0].value,
			slug: data[1].value,
			order: data[2].value,
			active: data[3].value,
			parent: data[4].value
		};

		try {
			await fetch(`/api/submenus`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(body)
			});
		} catch (err) {
			console.log(err);
		} finally {
			loadingSubmenu = false;
		}
	};

	const deleteMenu = async (e) => {
		try {
			await fetch(`/api/menus/${e.detail.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});
		} catch (err) {
			console.log(err);
		} finally {
			location.href = location.href;
		}
	};

	const modifyMenu = (e) => {
		location.href = `/admin/menus/${e.detail.id}`;
	};

	const deleteSubmenu = async (e) => {
		try {
			await fetch(`/api/submenus/${e.detail.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});
		} catch (err) {
			console.log(err);
		} finally {
			location.href = location.href;
		}
	};

	const modifySubmenu = (e) => {
		location.href = `/admin/submenus/${e.detail.id}`;
	};
</script>

<AdminButton
	icon={list ? Plus : Table}
	on:click={() => {
		list = !list;
	}}
/>
<main class="ml-56 dark:bg-gray-900 bg-gray-100 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		{#if list}
			<AdminList
				headers={['nombre', 'slug', 'orden', 'activo']}
				attributes={['name', 'slug', 'order', 'active']}
				data={JSON.parse(data.menus)}
				caption="Menus"
				on:modify-doc={modifyMenu}
				on:delete-doc={deleteMenu}
			/>
			<br />
			<AdminList
				headers={['nombre', 'slug', 'orden', 'activo', 'padre']}
				attributes={['name', 'slug', 'order', 'active', 'parent']}
				data={JSON.parse(data.submenus).map((submenu) => {
					submenu.parent = JSON.parse(data.menus).find((menu) => menu._id == submenu.parent).name;
					return submenu;
				})}
				caption="Submenus"
				on:modify-doc={modifySubmenu}
				on:delete-doc={deleteSubmenu}
			/>
		{:else}
			<AdminForm
				title="Formulario de alta de menus"
				components={componentsMenus}
				submitMessage="Subir menu"
				loading={loadingMenu}
				on:custom-submit={menuSubmit}
			/>
			<AdminForm
				title="Formulario de alta de submenus"
				components={componentsSubmenus}
				submitMessage="Subir submenu"
				loading={loadingSubmenu}
				on:custom-submit={submenuSubmit}
			/>
		{/if}
	</div>
</main>
