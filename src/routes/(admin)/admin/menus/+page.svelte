<script lang="ts">
	import type { PageData } from './$types';
	import { ChartPie, Plus, Table } from 'svelte-hero-icons';
	import type { IComponent } from '$lib/types/Components';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import AdminButton from '$lib/components/admin/AdminButton.svelte';
	import { validateInputText, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';
	import FormSelect from '$lib/components/inputs/FormSelect.svelte';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';

	export let data: PageData;
	let list = true;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };
	let menuType = 0;

	const componentsMain: IComponent = {
		label: 'Tipo de Menu',
		name: 'menus',
		value: '',
		required: true,
		options: [
			{ value: 1, name: 'Menu' },
			{ value: 2, name: 'SubMenu' }
		]
	};

	const componentsMenu: IComponent[] = [
		{
			type: 'text',
			label: 'Nombre',
			name: 'name',
			value: ''
		},
		{
			type: 'select',
			label: 'Esto tendria que ser un custom select Pagina',
			name: 'page',
			value: '',
			required: true,
			options: [
				{ value: 1, name: 'Pagina 1' },
				{ value: 2, name: 'Pagina 2' }
			]
		},
		{
			type: 'number',
			label: 'Orden',
			name: 'order',
			value: ''
		},
		{
			type: 'select',
			label: 'Activo',
			name: 'active',
			value: '',
			required: true,
			options: [
				{ value: true, name: 'SI' },
				{ value: false, name: 'No' }
			]
		}
	];

	const componentsSubMenu: IComponent[] = [
		{
			type: 'text',
			label: 'Nombre',
			name: 'name',
			value: ''
		},
		{
			type: 'select',
			label: 'Esto tendria que ser un custom select Pagina',
			name: 'page',
			value: '',
			required: true,
			options: [
				{ value: 1, name: 'Pagina 1' },
				{ value: 2, name: 'Pagina 2' }
			]
		},
		{
			type: 'select',
			label: 'Esto tendria que ser un custom select Menu Padre',
			name: 'page',
			value: '',
			required: true,
			options: [
				{ value: 1, name: 'Padre 1' },
				{ value: 2, name: 'Padre 2' }
			]
		},
		{
			type: 'number',
			label: 'Orden',
			name: 'order',
			value: ''
		},
		{
			type: 'select',
			label: 'Activo',
			name: 'active',
			value: '',
			required: true,
			options: [
				{ value: true, name: 'SI' },
				{ value: false, name: 'No' }
			]
		}
	];

	const validateInputs = (data: any) => {
		if (menuType == 1) {
			if (
				validateInputText(data[0].value).status &&
				validateEmptyInput(data[1].value).status &&
				validateEmptyInput(data[2].value).status &&
				validateEmptyInput(data[3].value).status
			) {
				return { status: true, message: 'Se subio correctamente' };
			} else {
				return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
			}
		} else if (menuType == 2) {
			if (
				validateInputText(data[0].value).status &&
				validateEmptyInput(data[1].value).status &&
				validateEmptyInput(data[2].value).status &&
				validateEmptyInput(data[3].value).status &&
				validateEmptyInput(data[4].value).status
			) {
				return { status: true, message: 'Se subio correctamente' };
			} else {
				return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
			}
		}
	};

	const changeForm = async (e: CustomEvent) => {
		menuType = e.detail.data;
		console.log(menuType);
	};

	// const menuSubmit = async (e: CustomEvent) => {
	// 	console.log(e.detail);
	// 	if (loading) return;

	// 	const { data } = e.detail;

	// 	// if (!files[0].type.includes('image'))
	// 	// 	throw new Error('No podes subir algo que no sea una imagen');

	// 	loading = true;

	// 	messageSubmit = validateInputs(data);
	// 	if (!messageSubmit.status) {
	// 		loading = false;
	// 		return (modalConfirm = true);
	// 	}
	// 	const body =
	// 		menuType == 1
	// 			? {
	// 					name: data[0].value,
	// 					page_id: data[1].value,
	// 					order: data[2].value,
	// 					active: data[3].value
	// 			  }
	// 			: {
	// 					name: data[0].value,
	// 					page_id: data[1].value,
	// 					parent_id: data[2].value,
	// 					order: data[3].value,
	// 					active: data[4].value
	// 			  };
	// 	modalConfirm = true;
	// 	loading = false;
	// 	console.log(body);
	// try {
	// 	await fetch(`/api/image`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Accept: 'application/json'
	// 		},
	// 		body: JSON.stringify(body)
	// 	});
	// 	modalConfirm = true;
	// 	// location.reload();
	// } catch (err) {
	// 	console.log('asdasd', err);
	// } finally {
	// 	loading = false;
	// }
	// };

	//  const deleteImage = async (e: CustomEvent) => {
	// 	try {
	// 		await fetch(`/api/image/${e.detail.id}`, {
	// 			method: 'DELETE',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Accept: 'application/json'
	// 			}
	// 		});
	// 	} catch (err) {
	// 		console.log(err);
	// 	} finally {
	// 		location.href = location.href;
	// 	}
	// };

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

<AdminButton
	icon={list ? Plus : Table}
	on:click={() => {
		list = !list;
	}}
/>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		{#if list}
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
		{:else}
			<FormSelect
				label={componentsMain.label}
				options={componentsMain.options}
				bind:value={componentsMain.value}
				required={componentsMain.value}
				on:custom-change={changeForm}
			/>
			<br />
			{#if menuType == 1}
				<AdminForm
					title="Formulario de Menu"
					components={componentsMenu}
					submitMessage="Subir Menu"
					{loading}
				/>
			{:else if menuType == 2}
				<AdminForm
					title="Formulario de SubMenu"
					components={componentsSubMenu}
					submitMessage="Subir SubMenu"
					{loading}
				/>
			{/if}
		{/if}
	</div>
	<div>
		{#if modalConfirm}
			<AdminModalConfirm
				status={messageSubmit.status}
				message={messageSubmit.message}
				on:close={() => {
					modalConfirm = false;
					messageSubmit.status ? location.reload() : (list = false);
				}}
			/>
		{/if}
	</div>
</main>
