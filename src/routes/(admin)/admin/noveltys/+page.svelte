<script lang="ts">
	import type { PageData } from './$types';
	import { Plus, Table } from 'svelte-hero-icons';
	import type { IComponent } from '$lib/types/Components';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	// import AdminList from '$lib/components/AdminList.svelte';
	// import AdminListRowNovelty from '$lib/components/rows/AdminListRowNovelty.svelte';
	import AdminButton from '$lib/components/admin/AdminButton.svelte';
	import { validateInputText, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';

	export let data: PageData;
	let list = true;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };
	console.log('-----------------------------------');
	console.log(JSON.parse(data.images));
	console.log('-----------------------------------');

	const components: IComponent[] = [
		{
			type: 'select',
			label: 'Esto deberia ser un custom select Paginas',
			name: 'page',
			value: '',
			required: true,
			options: [
				{ value: '0', name: 'Pagina 1' },
				{ value: '1', name: 'Pagina 2' }
			]
		},
		{
			type: 'select-image',
			label: 'Imagen',
			name: 'image',
			value: JSON.parse(data.images)
		},
		{
			type: 'date',
			label: 'Fecha de la novedad',
			name: 'date',
			value: '',
			required: true
		}
	];

	const validateInputs = (data: any) => {
		if (
			validateEmptyInput(data[0].value).status &&
			validateEmptyInput(data[1].value).status &&
			validateEmptyInput(data[2].value).status
		) {
			return { status: true, message: 'Se subio correctamente' };
		} else {
			return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
		}
	};

	const noveltySubmit = async (e: CustomEvent) => {
		if (loading) return;

		loading = true;

		const { data } = e.detail;
		console.log(data);
		messageSubmit = validateInputs(data);
		if (!messageSubmit.status) {
			loading = false;
			return (modalConfirm = true);
		}
		const body = {
			page_id: data[0].value,
			image_id: data[1].value,
			// slug:
			// 	'/pages/catalogo/novedades/' +
			// 	data[0].value
			// 		.toLowerCase()
			// 		.replace(/[^a-zA-Z]/g, ' ')
			// 		.replace(/ /g, '-')
			// 		.replace(/^(-)/g, '')
			// 		.replace(/(-)$/g, ''),
			date: new Date(data[2].value).setDate(new Date(data[2].value).getDate() + 1)
		};
		console.log(body);
		modalConfirm = true;
		loading = false;
		// try {
		// 	await fetch(`/api/noveltys`, {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Accept: 'application/json'
		// 		},
		// 		body: JSON.stringify(body)
		// 	});
		// 	modalConfirm = true;
		// } catch (err) {
		// 	console.log(err);
		// } finally {
		// 	loading = false;
		// }
	};

	const deleteNovelty = async (e: CustomEvent) => {
		try {
			await fetch(`/api/noveltys/${e.detail.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});
		} catch (err) {
			console.log(err);
		} finally {
			location.href = location.href;
		}
	};

	const modifyNovelty = (e: CustomEvent) => {
		location.href = `/admin/noveltys/${e.detail.id}`;
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
		<!-- {#if list}
			<AdminList
				headers={['titulo', 'resumen', 'slug', 'imagen', 'fecha']}
				attributes={['title', 'summary', 'slug', 'image', 'date']}
				data={JSON.parse(data.noveltys)}
				on:delete-doc={deleteNovelty}
				on:modify-doc={modifyNovelty}
				caption="Novedades"
				customRow={AdminListRowNovelty}
			/>
		{:else} -->
		<AdminForm
			title="Formulario de novedades"
			{components}
			submitMessage="Subir novedad"
			{loading}
			on:custom-submit={noveltySubmit}
		/>
		<!-- {/if} -->
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
