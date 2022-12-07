<script lang="ts">
	import type { PageData } from './$types';
	import { Plus, Table } from 'svelte-hero-icons';
	import type { IComponent } from '$lib/types/Components';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import AdminButton from '$lib/components/admin/AdminButton.svelte';
	import { validateInputText, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';
	import AdminListRowNovelty from '$lib/components/admin/list/rows/AdminListRowNovelty.svelte';

	export let data: PageData;
	let list = true;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };
	console.log(JSON.parse(data.noveltys));

	const components: IComponent[] = [
		{
			type: 'select',
			label: 'Paginas',
			name: 'page_id',
			value: '',
			required: true,
			options: JSON.parse(data.pages).map((page) => {
				return { name: page.title, value: page.id };
			})
		},
		{
			type: 'select-image',
			label: 'Imagen',
			name: 'image_id',
			value: '',
			images: JSON.parse(data.images)
		},
		{
			type: 'date',
			label: 'Fecha de la novedad',
			name: 'date',
			value: '',
			required: true
		}
	];

	const validators = (data: any) => {
		if (
			validateEmptyInput(data[0][1]).status &&
			validateEmptyInput(data[1][1]).status &&
			validateEmptyInput(data[2][1]).status
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
<div>
	{#if list}
		<AdminList
			headers={['Titulo', 'Fecha', 'Pagina', 'Imagen']}
			data={JSON.parse(data.noveltys)}
			caption="Novedades"
			actions={['delete', 'edit']}
			customRow={AdminListRowNovelty}
			options={[]}
			iterators={{ search: ['Page', 'title'], select: ['null'] }}
			placeholder="Ingrese un Titulo..."
		/>
	{:else}
		<AdminForm
			title="Formulario de novedades"
			{components}
			submitMessage="Subir novedad"
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
