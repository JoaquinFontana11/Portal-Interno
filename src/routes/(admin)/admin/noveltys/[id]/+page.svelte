<script lang="ts">
	import type { PageData } from './$types';
	import type { IComponent } from '$lib/types/Components';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import { validateInputText, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';

	export let data: PageData;
	let list = true;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };

	const novelty = JSON.parse(data.novelty);
	console.log(novelty.date);

	const components: IComponent[] = [
		{
			type: 'select',
			label: 'Paginas',
			name: 'page_id',
			value: novelty.Page.id,
			required: true,
			options: JSON.parse(data.pages).map((page) => {
				return { name: page.title, value: page.id };
			})
		},
		{
			type: 'select-image',
			label: 'Imagen',
			name: 'image_id',
			value: novelty.Image.id,
			images: JSON.parse(data.images)
		},
		{
			type: 'date',
			label: 'Fecha de la novedad',
			name: 'date',
			value: new Date(novelty.date),
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

	const addExtraData = (components) => {
		return [{ name: 'id', value: novelty.id }];
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminForm
			title="Formulario de novedades"
			{components}
			submitMessage="Modificar novedad"
			{loading}
			action="update"
			{addExtraData}
			{validators}
			on:validation-end={(e) => {
				messageSubmit = e.detail;
				modalConfirm = true;
			}}
		/>
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
