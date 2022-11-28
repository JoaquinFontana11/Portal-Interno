<script lang="ts">
	import type { PageData } from './$types';
	import { Plus, Table } from 'svelte-hero-icons';
	import type { IComponent } from '$lib/types/Components';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import AdminButton from '$lib/components/admin/AdminButton.svelte';
	import { validateInputText, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';

	export let data: PageData;
	let list = true;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };

	const components: IComponent[] = [
		{
			type: 'text',
			label: 'Titulo',
			name: 'title',
			value: ''
		},
		{
			type: 'editor',
			label: 'Cuerpo de la Pagina',
			name: 'body',
			value: ''
		},
		{
			type: 'select',
			label: 'Proyecto',
			name: 'project',
			value: '',
			required: true,
			options: [
				{ value: true, name: 'Si' },
				{ value: false, name: 'No' }
			]
		}
	];

	const validateInputs = (data: any) => {
		if (validateInputText(data[0].value).status && validateEmptyInput(data[2].value).status) {
			return { status: true, message: 'Se subio correctamente' };
		} else {
			return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
		}
	};

	// const pageSubmit = async (e: CustomEvent) => {
	// 	console.log(e.detail);
	// 	if (loading) return;

	// 	const { data } = e.detail;

	// 	// if (!files[0].type.includes('image'))
	// 	// 	throw new Error('No podes subir algo que no sea una imagen');

	// 	loading = true;

	// 	messageSubmit = validateInputs(data);
	// 	if (!messageSubmit.status) {
	// 		loading = false;
	// 		return (modalConfirm = true);
	// 	}
	// 	const body = {
	// 		title: data[0].value,
	// 		body: data[1].value,
	// 		slug:
	// 			'/pages/' +
	// 			data[0].value
	// 				.toLowerCase()
	// 				.replace(/[^a-zA-Z]/g, ' ')
	// 				.replace(/ /g, '-')
	// 				.replace(/^(-)/g, '')
	// 				.replace(/(-)$/g, ''),
	// 		project: data[2].value
	// 	};
	// 	modalConfirm = true;
	// 	loading = false;
	// 	console.log(body);
	// 	// try {
	// 	// 	await fetch(`/api/image`, {
	// 	// 		method: 'POST',
	// 	// 		headers: {
	// 	// 			'Content-Type': 'application/json',
	// 	// 			Accept: 'application/json'
	// 	// 		},
	// 	// 		body: JSON.stringify(body)
	// 	// 	});
	// 	// 	modalConfirm = true;
	// 	// 	// location.reload();
	// 	// } catch (err) {
	// 	// 	console.log('asdasd', err);
	// 	// } finally {
	// 	// 	loading = false;
	// 	// }
	// };

	// const deleteImage = async (e: CustomEvent) => {
	// 	try {
	// 		await fetch(`/api/image/${e.detail.id}`, {
	// 			method: 'DELETE',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Accept: 'application/json'
	// 			}
	// 		});
	// 	} catch (err) {
	// 		console.log(err);
	// 	} finally {
	// 		location.href = location.href;
	// 	}
	// };
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
				headers={['Titulo', 'Slug', 'Proyecto']}
				attributes={['title', 'slug', 'project']}
				data={JSON.parse(data.pages)}
				caption="Paginas"
				actions={['delete', 'edit']}
			/>
		{:else}
			<AdminForm
				title="Formulario de Paginas"
				{components}
				submitMessage="Subir Pagina"
				{loading}
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
