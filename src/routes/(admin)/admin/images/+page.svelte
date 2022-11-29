<script lang="ts">
	import { Plus, Table } from 'svelte-hero-icons';
	import type { IComponent } from '$lib/types/Components';
	import type { PageData } from './$types';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import AdminButton from '$lib/components/admin/AdminButton.svelte';
	import { validateInputText, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';
	import AdminListRowImage from '$lib/components/admin/list/rows/AdminListRowImage.svelte';

	export let data: PageData;
	let list = true;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };

	const components: IComponent[] = [
		{
			type: 'image',
			label: 'Imagen a agregar',
			name: 'image',
			value: '',
			files: []
		},
		{
			type: 'text',
			label: 'Texto alternativo',
			name: 'alt',
			value: ''
		}
	];

	const validators = (data: any) => {
		if (validateEmptyInput(data[0][1]).status && validateInputText(data[0][1]).status) {
			return { status: true, message: 'Se subio correctamente' };
		} else {
			return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
		}
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
				headers={['Imagen', 'Nombre', 'Texto alternativo']}
				data={JSON.parse(data.images)}
				caption="Imagenes"
				actions={['delete']}
				customRow={AdminListRowImage}
			/>
		{:else}
			<AdminForm
				title="Formulario imagenes"
				{components}
				submitMessage="Subir imagen"
				{loading}
				action="create"
				{validators}
				on:validation-end={(e) => {
					messageSubmit = e.detail;
					modalConfirm = true;
				}}
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
