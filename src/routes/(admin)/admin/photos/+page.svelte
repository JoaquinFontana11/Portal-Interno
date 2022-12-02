<script lang="ts">
	import type { PageData } from './$types';
	import { Plus, Table } from 'svelte-hero-icons';
	import type { IComponent } from '$lib/types/Components';
	import { validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';
	import AdminListRowPhoto from '$lib/components/admin/list/rows/AdminListRowPhoto.svelte';
	import AdminButton from '$lib/components/admin/AdminButton.svelte';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';

	export let data: PageData;
	let list = true;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };
	const user = JSON.parse(data.user);

	const components: IComponent[] = [
		{
			type: 'text',
			label: 'Titulo',
			name: 'title',
			value: ''
		},
		{
			type: 'big-select-image',
			label: 'Seleccionar Imagen',
			name: 'image_id',
			value: '',
			images: JSON.parse(data.images)
		}
	];
	const validators = (data: any) => {
		if (validateEmptyInput(data[0][1]).status) {
			return { status: true, message: 'Se subio correctamente' };
		} else {
			return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
		}
	};

	const extraDataUser = (components) => {
		return [{ name: 'user_id', value: user.id }];
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
				headers={['Titulo', 'Imagen']}
				data={JSON.parse(data.galleryPhotos)}
				caption="Fotos de galeria"
				actions={['delete']}
				customRow={AdminListRowPhoto}
			/>
		{:else}
			<AdminForm
				title="Formulario de Fotos de Galeria"
				{components}
				submitMessage="Subir Foto a Galeria"
				{loading}
				action="create"
				{validators}
				addExtraData={extraDataUser}
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
