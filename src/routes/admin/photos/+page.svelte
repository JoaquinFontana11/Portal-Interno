<script>
	import { Plus, Table } from 'svelte-hero-icons';
	import AdminForm from '$lib/components/AdminForm.svelte';
	import AdminList from '$lib/components/AdminList.svelte';
	import AdminButton from '$lib/components/AdminButton.svelte';
	import AdminFormImagePicker from '$lib/components/inputs/AdminFormImagePicker.svelte';
	import AdminListRowPhoto from '$lib/components/rows/AdminListRowPhoto.svelte';

	export let data;

	let loading = false;
	let list = true;
	let urlSelected = '';

	const components = [
		{
			type: 'text',
			label: 'Titulo de la foto',
			name: 'title',
			value: '',
			required: true
		}
	];

	const photoSubmit = async (e) => {
		if (loading) return;
		loading = true;
		const { data } = e.detail;
		const body = {
			title: data[0].value,
			image: urlSelected,
			comments: []
		};
		try {
			await fetch(`/api/photos`, {
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

	const deletePhoto = async (e) => {
		try {
			await fetch(`/api/photos/${e.detail.id}`, {
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

	const modifyPhoto = (e) => {
		location.href = `/admin/photos/${e.detail.id}`;
	};

	const selectPhoto = (e) => {
		urlSelected = e.detail.url;
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
				headers={['Titulo', 'Imagen']}
				attributes={['title', 'image']}
				data={JSON.parse(data.photos)}
				on:modify-doc={modifyPhoto}
				on:delete-doc={deletePhoto}
				caption="Fotos"
				customRow={AdminListRowPhoto}
			/>
		{:else}
			<AdminForm
				title="Formulario de alta de foto"
				{components}
				submitMessage="Subir Foto"
				{loading}
				on:custom-submit={photoSubmit}
				><AdminFormImagePicker
					slot="bottom-slot"
					images={JSON.parse(data.images).filter((image) => image.url.includes('photos'))}
					on:image-picked={selectPhoto}
				/>
			</AdminForm>
			{#if urlSelected}
				<figure class="absolute max-w-sm transition-all flex justify-center top-2 right-3">
					<img
						class={`max-w-full h-auto rounded-lg `}
						src={urlSelected}
						alt="Imagen seleccionada"
						width="200px"
					/>
				</figure>
			{/if}
		{/if}
	</div>
</main>
