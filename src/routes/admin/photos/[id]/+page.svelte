<script>
	import AdminForm from '$lib/components/AdminForm.svelte';
	import AdminFormImagePicker from '$lib/components/inputs/AdminFormImagePicker.svelte';

	export let data;

	let loading = false;
	let photo = JSON.parse(data.photo);

	const components = [
		{
			type: 'text',
			label: 'Titulo de la foto',
			name: 'title',
			value: photo.title,
			required: true
		}
	];

	const photoSubmit = async (e) => {
		if (loading) return;
		loading = true;
		const { data } = e.detail;
		const body = {
			title: data[0].value,
			image: photo.image,
			comments: []
		};
		try {
			await fetch(`/api/photos/${photo._id}`, {
				method: 'PATCH',
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

	const selectPhoto = (e) => {
		photo.image = e.detail.url;
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-gray-100 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminForm
			title="Formulario de alta de foto"
			{components}
			submitMessage="Modificar Foto"
			{loading}
			on:custom-submit={photoSubmit}
			><AdminFormImagePicker
				slot="bottom-slot"
				images={JSON.parse(data.images).filter((image) => image.url.includes('photos'))}
				on:image-picked={selectPhoto}
			/>
		</AdminForm>
		{#if photo.image && photo.image != '#'}
			<figure class="absolute max-w-sm transition-all flex justify-center top-2 right-3">
				<img
					class={`max-w-full h-auto rounded-lg `}
					src={photo.image}
					alt="Imagen seleccionada"
					width="200px"
				/>
			</figure>
		{/if}
	</div>
</main>
