<script lang="ts">
	import type { PageData } from './$types';
	import type { IComponent } from '$lib/types/Components';
	import { Plus, Table } from 'svelte-hero-icons';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import AdminButton from '$lib/components/admin/AdminButton.svelte';
	import { validateInputFile, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';

	export let data: PageData;
	let list = true;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };

	const components: IComponent[] = [
		{
			type: 'file',
			label: 'Input de archivos',
			name: 'file',
			value: '',
			files: []
		},
		{
			type: 'text',
			label: 'Descripcion del archivo',
			name: 'description',
			value: '',
			required: true
		},
		{
			type: 'select',
			label: 'Grupo',
			name: 'group',
			value: '',
			required: true,
			options: [
				{ value: 'DPMA', name: 'DPMA' },
				{ value: 'IOP', name: 'IOP' },
				{ value: 'PMO', name: 'PMO' },
				{ value: 'MC', name: 'MC' },
				{ value: 'SP', name: 'SP' },
				{ value: 'CYC', name: 'CYC' }
			]
		}
	];

	const validators = (data: any) => {
		if (validateEmptyInput(data[0][1]).status && validateEmptyInput(data[1][1]).status) {
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
			headers={['Nombre', 'Descripcion', 'Extension', 'Grupo']}
			attributes={['name', 'description', 'extension', 'group']}
			data={JSON.parse(data.files).map((file) => {
				return {
					id: file.id,
					name: file.name.split('.').at(0),
					extension: file.name.split('.').at(-1),
					description: file.description,
					group: file.group
				};
			})}
			caption="Archivos"
			actions={['delete']}
			options={[
				{ value: 'DPMA', name: 'DPMA' },
				{ value: 'IOP', name: 'IOP' },
				{ value: 'PMO', name: 'PMO' },
				{ value: 'MC', name: 'MC' },
				{ value: 'SP', name: 'SP' },
				{ value: 'CYC', name: 'CYC' }
			]}
			iterators={{ search: ['name'], select: ['group'] }}
			placeholder="Ingrese un Nombre..."
		/>
	{:else}
		<AdminForm
			title="Formulario de archivos"
			{components}
			submitMessage="Subir archivo"
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
