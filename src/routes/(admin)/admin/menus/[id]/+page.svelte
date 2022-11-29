<script lang="ts">
	import type { PageData } from './$types';
	import { ChartPie, Plus, Table } from 'svelte-hero-icons';
	import type { IComponent } from '$lib/types/Components';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import { validateInputText, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';
	import FormSelect from '$lib/components/inputs/FormSelect.svelte';

	export let data: PageData;
	let list = true;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };

	const menu = JSON.parse(data.menu);
	const submenu = JSON.parse(data.submenu);

	let menuType =
		Object.entries(submenu).length != 0 && Object.entries(menu).length != 0
			? 0
			: Object.entries(submenu).length != 0
			? 2
			: 1;

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

	let componentsMenu: IComponent[];
	let componentsSubMenu: IComponent[];

	if (Object.entries(menu).length != 0) {
		componentsMenu = [
			{
				type: 'text',
				label: 'Nombre',
				name: 'name',
				value: menu.name
			},
			{
				type: 'select',
				label: 'Pagina',
				name: 'page_id',
				value: menu.Page?.id || '',
				required: true,
				options: JSON.parse(data.pages).map((page) => {
					return { name: page.title, value: page.id };
				})
			},
			{
				type: 'number',
				label: 'Orden',
				name: 'order',
				value: menu.order
			},
			{
				type: 'select',
				label: 'Activo',
				name: 'active',
				value: menu.active,
				required: true,
				options: [
					{ value: true, name: 'SI' },
					{ value: false, name: 'No' }
				]
			}
		];
	}

	if (Object.entries(submenu).length != 0) {
		componentsSubMenu = [
			{
				type: 'text',
				label: 'Nombre',
				name: 'name',
				value: submenu.name,
				required: true
			},
			{
				type: 'select',
				label: 'Pagina',
				name: 'page_id',
				value: submenu.Page?.id || '',
				required: true,
				options: JSON.parse(data.pages).map((page) => {
					return { name: page.title, value: page.id };
				})
			},
			{
				type: 'select',
				label: 'Menu padre',
				name: 'parent_id',
				value: submenu.Menu?.id || '',
				required: true,
				options: JSON.parse(data.menus).map((menu) => {
					return { name: menu.name, value: menu.id };
				})
			},
			{
				type: 'number',
				label: 'Orden',
				name: 'order',
				value: submenu.order
			},
			{
				type: 'select',
				label: 'Activo',
				name: 'active',
				value: submenu.active,
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
				value: submenu.description,
				required: false
			}
		];
	}

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

	const extraDataId = (id) => (components) => {
		return [{ name: 'id', value: id }];
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		{#if Object.entries(submenu).length != 0 && Object.entries(menu).length != 0}
			<FormSelect
				label={componentsMain.label}
				options={componentsMain.options}
				bind:value={componentsMain.value}
				required={componentsMain.value}
				on:custom-change={changeForm}
			/>
		{/if}
		<br />
		{#if menuType == 1}
			<AdminForm
				title="Formulario de Menu"
				components={componentsMenu}
				submitMessage="Subir Menu"
				{loading}
				action="updateMenu"
				validators={validatorMenu}
				on:validation-end={(e) => {
					messageSubmit = e.detail;
					modalConfirm = true;
				}}
				addExtraData={extraDataId(menu?.id)}
			/>
		{:else if menuType == 2}
			<AdminForm
				title="Formulario de Submenu"
				components={componentsSubMenu}
				submitMessage="Subir Submenu"
				{loading}
				action="updateSubmenu"
				validators={validatorSubmenu}
				on:validation-end={(e) => {
					messageSubmit = e.detail;
					modalConfirm = true;
				}}
				addExtraData={extraDataId(submenu?.id)}
			/>
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
