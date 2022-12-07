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
<div>
	{#if list}
		<AdminList
			headers={['Imagen', 'Nombre', 'Texto alternativo']}
			data={JSON.parse(data.images)}
			caption="Imagenes"
			actions={['delete']}
			customRow={AdminListRowImage}
			options={[]}
			iterators={{ search: ['name'], select: ['null'] }}
			placeholder="Ingrese un Nombre..."
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
