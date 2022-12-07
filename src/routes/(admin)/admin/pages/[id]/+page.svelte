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
		const slug =
			'/pages/' +
			components[0].value
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

<div>
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
