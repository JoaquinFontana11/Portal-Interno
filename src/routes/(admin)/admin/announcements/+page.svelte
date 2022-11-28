<script lang="ts">
	import { Plus, Table } from 'svelte-hero-icons';
	import type { IComponent } from '$lib/types/Components';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	// import AdminList from '$lib/components/AdminList.svelte';
	import AdminButton from '$lib/components/admin/AdminButton.svelte';
	// import AdminListRowPhoto from '$lib/components/rows/AdminListRowPhoto.svelte';
	import { validateInputText, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';

	export let data: any;
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

	const validateInputs = (data: any) => {
		const initDate = new Date(data[2].value);
		const endDate = new Date(data[3].value);
		console.log(endDate - initDate);
		if (
			validateInputText(data[0].value).status &&
			validateEmptyInput(data[2].value).status &&
			validateEmptyInput(data[3].value).status &&
			endDate - initDate >= 0
		) {
			return { status: true, message: 'Se subio correctamente' };
		} else {
			return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
		}
	};

	const announcementSubmit = async (e: CustomEvent) => {
		if (loading) return;

		const { data } = e.detail;

		loading = true;

		messageSubmit = validateInputs(data);
		if (!messageSubmit.status) {
			loading = false;
			return (modalConfirm = true);
		}

		const date = new Date(data[2].value);
		console.log(date);
		const body = {
			title: data[0].value,
			content: data[1].value,
			init_date: data[2].value,
			end_date: data[3].value
		};
		modalConfirm = true;
		loading = false;
		console.log(body);
		// try {
		// 	await fetch(`/api/image`, {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Accept: 'application/json'
		// 		},
		// 		body: JSON.stringify(body)
		// 	});
		// 	modalConfirm = true;
		// 	// location.reload();
		// } catch (err) {
		// 	console.log('asdasd', err);
		// } finally {
		// 	loading = false;
		// }
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
				headers={['Imagen', 'Texto alternativo']}
				attributes={['url', 'alt']}
				data={JSON.parse(data.images)}
				on:delete-doc={deleteImage}
				caption="Imagenes"
				actions={['delete']}
				customRow={AdminListRowPhoto}
			/>
		{:else} -->
		<AdminForm
			title="Formulario Noticias"
			{components}
			submitMessage="Agregar noticia"
			{loading}
			on:custom-submit={announcementSubmit}
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
<script lang="ts">
	import type { PageData } from './$types';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';

	export let data: PageData;

	const deleteAnnouncement = (e: CustomEvent) => {
		console.log(e.detail);
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminList
			headers={['Titulo', 'Fecha de inicio', 'Fecha de fin']}
			attributes={['title', 'init_date', 'end_date']}
			data={JSON.parse(data.announcements)}
			on:delete-doc={deleteAnnouncement}
			caption="Anuncios"
			actions={['delete']}
		/>
	</div>
</main>
