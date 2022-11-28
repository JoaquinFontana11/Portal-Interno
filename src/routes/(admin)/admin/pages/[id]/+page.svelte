<script lang="ts">
	import type { PageData } from './$types';
	import type { IComponent } from '$lib/types/Components';
	import { validateInputText, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';

	export let data: PageData;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };

	const page = JSON.parse(data.page);

	const components: IComponent[] = [
		{
			type: 'text',
			label: 'Titulo',
			name: 'title',
			value: page.title
		},
		{
			type: 'editor',
			label: 'Cuerpo de la Pagina',
			name: 'body',
			value: page.body
		},
		{
			type: 'select',
			label: 'Proyecto',
			name: 'project',
			value: page.project,
			required: true,
			options: [
				{ value: true, name: 'Si' },
				{ value: false, name: 'No' }
			]
		}
	];

	const validators = (data: any) => {
		if (validateInputText(data[0][1]).status && validateEmptyInput(data[2][1]).status) {
			return { status: true, message: 'Se subio correctamente' };
		} else {
			return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
		}
	};

	const extraDataSlug = (components) => {
		const slug = components[0].value
			.toLowerCase()
			.replace(/[^a-zA-Z]/g, ' ')
			.replace(/ /g, '-')
			.replace(/^(-)/g, '')
			.replace(/(-)$/g, '');
		return [
			{ name: 'slug', value: slug },
			{ name: 'id', value: page.id }
		];
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminForm
			title="Formulario de Paginas"
			{components}
			submitMessage="Subir Pagina"
			{loading}
			action="update"
			addExtraData={extraDataSlug}
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
