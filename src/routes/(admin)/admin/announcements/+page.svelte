<script lang="ts">
	import type { PageData } from './$types';
	import { Plus, Table } from 'svelte-hero-icons';
	import type { IComponent } from '$lib/types/Components';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';
	import AdminButton from '$lib/components/admin/AdminButton.svelte';
	import { validateInputText, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';

	export let data: PageData;
	let list = true;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };

	const components: IComponent[] = [
		{
			type: 'text',
			label: 'Titulo',
			name: 'name',
			value: ''
		},
		{
			type: 'editor',
			label: 'Contenido',
			name: 'content',
			value: ''
		},
		{
			type: 'date',
			label: 'Fecha de Inicio',
			name: 'init_date',
			value: ''
		},
		{
			type: 'date',
			label: 'Fecha de Finalizacion',
			name: 'end_date',
			value: ''
		}
	];

	const validators = (data: any) => {
		const initDate = new Date(data[2][1]).getTime();
		const endDate = new Date(data[3][1]).getTime();
		if (
			validateInputText(data[0][1]).status &&
			validateEmptyInput(data[2][1]).status &&
			validateEmptyInput(data[3][1]).status &&
			endDate - initDate >= 0
		) {
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
				headers={['Titulo', 'Fecha de inicio', 'Fecha de fin']}
				attributes={['title', 'init_date', 'end_date']}
				data={JSON.parse(data.announcements)}
				caption="Anuncios"
				actions={['delete']}
			/>
		{:else}
			<AdminForm
				title="Formulario Noticias"
				{components}
				submitMessage="Agregar noticia"
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
