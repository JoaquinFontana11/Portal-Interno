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
			label: 'Pagina',
			name: 'page_id',
			value: '',
			required: true,
			options: JSON.parse(data.pages).map((page) => {
				return { name: page.title, value: page.id };
			})
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
			value: '',
			required: true
		},
		{
			type: 'select',
			label: 'Pagina',
			name: 'page_id',
			value: '',
			required: true,
			options: JSON.parse(data.pages).map((page) => {
				return { name: page.title, value: page.id };
			})
		},
		{
			type: 'select',
			label: 'Menu padre',
			name: 'parent_id',
			value: '',
			required: true,
			options: JSON.parse(data.menus).map((menu) => {
				return { name: menu.name, value: menu.id };
			})
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
		},
		{
			type: 'text',
			label: 'Descripcion',
			name: 'description',
			value: '',
			required: false
		}
	];

	const validatorMenu = (data: any) => {
		if (
			validateInputText(data[0][1]).status &&
			validateEmptyInput(data[1][1]).status &&
			validateEmptyInput(data[2][1]).status &&
			validateEmptyInput(data[3][1]).status
		) {
			return { status: true, message: 'Se subio correctamente' };
		} else {
			return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
		}
	};

	const validatorSubmenu = (data: any) => {
		if (
			validateInputText(data[0][1]).status &&
			validateEmptyInput(data[1][1]).status &&
			validateEmptyInput(data[2][1]).status &&
			validateEmptyInput(data[3][1]).status
		) {
			return { status: true, message: 'Se subio correctamente' };
		} else {
			return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
		}
	};

	const changeForm = async (e: CustomEvent) => {
		menuType = e.detail.data;
	};
</script>

<AdminButton
	icon={list ? Plus : Table}
	on:click={() => {
		list = !list;
	}}
/>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll ">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		{#if list}
			<AdminList
				headers={['Nombre', 'Pagina', 'Orden', 'Activo']}
				attributes={['name', 'slug', 'order', 'active']}
				data={JSON.parse(data.menus).map((menu) => {
					menu.slug = menu.Page?.slug || 'no asociado';
					return menu;
				})}
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
					action="createMenu"
					validators={validatorMenu}
					on:validation-end={(e) => {
						messageSubmit = e.detail;
						modalConfirm = true;
					}}
				/>
			{:else if menuType == 2}
				<AdminForm
					title="Formulario de Submenu"
					components={componentsSubMenu}
					submitMessage="Subir Submenu"
					{loading}
					action="createSubmenu"
					validators={validatorSubmenu}
					on:validation-end={(e) => {
						messageSubmit = e.detail;
						modalConfirm = true;
					}}
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
