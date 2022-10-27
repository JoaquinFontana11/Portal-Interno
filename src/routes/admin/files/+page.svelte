<script>
	import { Plus, Table } from 'svelte-hero-icons';
	import AdminForm from '$lib/components/AdminForm.svelte';
	import AdminList from '$lib/components/AdminList.svelte';
	import AdminButton from '$lib/components/AdminButton.svelte';

	export let data;
	let list = true;
	let loading = false;

	const components = [
		{
			type: 'file',
			label: 'Input de archivos',
			name: 'manual',
			value: '',
			files: []
		},
		{
			type: 'select',
			label: 'Tipo de archivo',
			name: 'file',
			value: '',
			required: true,
			options: [
				{ value: 'files', name: 'Archivo' },
				{ value: 'videos', name: 'Video' }
			]
		}
	];

	const fileSubmit = async (e) => {
		if (loading) return;
		const { data } = e.detail;
		const files = data[0].value;

		loading = true;

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = async (e) => {
			// uploadImage(e.target.result);
			const file = e.target.result.split(',');
			const body = {
				file: file[1],
				type: data[1].value,
				name: files[0].name
			};
			try {
				await fetch(`/api/files`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify(body)
				});
			} catch (err) {
				console.log(err);
			} finally {
				loading = false;
			}
		};
	};

	const deleteFile = async (e) => {
		try {
			await fetch(`/api/files/${e.detail.id}`, {
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
<main class="ml-56 dark:bg-gray-900 bg-gray-100 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		{#if list}
			<AdminList
				headers={['Nombre', 'Extension', 'Orden']}
				attributes={['name', 'extension', 'order']}
				data={JSON.parse(data.files).map((file) => {
					return {
						_id: file._id,
						name: file.name.split('.').at(0),
						extension: file.name.split('.').at(-1),
						order: file.order
					};
				})}
				on:delete-doc={deleteFile}
				caption="Archivos"
				actions={['delete']}
			/>
		{:else}
			<AdminForm
				title="Formulario de archivos"
				{components}
				submitMessage="Subir archivo"
				{loading}
				on:custom-submit={fileSubmit}
			/>
		{/if}
	</div>
</main>
