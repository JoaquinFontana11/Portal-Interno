<script lang="ts">
	import { Plus, Table } from 'svelte-hero-icons';
	import type { IComponent } from '$lib/types/Components';
	import type { PageData } from './$types';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import AdminButton from '$lib/components/admin/AdminButton.svelte';

	import { validateInputText, validateInputFileImage } from '$lib/components/inputs/validators';
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

	const validateInputs = (data: any) => {
		if (validateInputFileImage(data[1].value).status && validateInputText(data[1].value).status) {
			return { status: true, message: 'Se subio correctamente' };
		} else {
			return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
		}
	};

	// const imageSubmit = async (e: CustomEvent) => {
	// 	console.log(e.detail);
	// 	if (loading) return;

	// 	const { data } = e.detail;
	// 	const files = data[0].value;

	// 	// if (!files[0].type.includes('image'))
	// 	// 	throw new Error('No podes subir algo que no sea una imagen');

	// 	loading = true;

	// 	messageSubmit = validateInputs(data);
	// 	if (!messageSubmit.status) {
	// 		loading = false;
	// 		return (modalConfirm = true);
	// 	}

	// 	const reader = new FileReader();
	// 	reader.readAsDataURL(files[0]);
	// 	reader.onload = async (e) => {
	// 		const target = e.target as FileReader;
	// 		const fileReaderResult = target.result as string;
	// 		const imgData = fileReaderResult.split(',');
	// 		const body = {
	// 			url: imgData[1],
	// 			alt: data[1].value,
	// 			name: files[0].name
	// 		};
	// 		modalConfirm = true;
	// 		loading = false;
	// 		console.log(body);
	// 		// try {
	// 		// 	await fetch(`/api/image`, {
	// 		// 		method: 'POST',
	// 		// 		headers: {
	// 		// 			'Content-Type': 'application/json',
	// 		// 			Accept: 'application/json'
	// 		// 		},
	// 		// 		body: JSON.stringify(body)
	// 		// 	});
	// 		// 	modalConfirm = true;
	// 		// 	// location.reload();
	// 		// } catch (err) {
	// 		// 	console.log('asdasd', err);
	// 		// } finally {
	// 		// 	loading = false;
	// 		// }
	// 	};
	// };

	const deleteImage = async (e: CustomEvent) => {
		try {
			await fetch(`/api/image/${e.detail.id}`, {
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
			headers={['Imagen', 'Nombre', 'Texto alternativo']}
			data={JSON.parse(data.images)}
			caption="Imagenes"
			actions={['delete']}
			customRow={AdminListRowImage}
		/>
		{:else}
		<AdminForm
			title="Formulario imagenes"
			{components}
			submitMessage="Subir imagen"
			{loading}
			on:custom-submit={imageSubmit}
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
