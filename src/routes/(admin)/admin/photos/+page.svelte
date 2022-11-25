<script lang="ts">
	import type { PageData } from './$types';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';
	import AdminListRowPhoto from '$lib/components/admin/list/rows/AdminListRowPhoto.svelte';

	export let data: PageData;

	const deletePhoto = (e: CustomEvent) => {
		console.log(e.detail);
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminList
			headers={['Titulo', 'Imagen']}
			data={JSON.parse(data.galleryPhotos)}
			on:delete-doc={deletePhoto}
			caption="Fotos de galeria"
			actions={['delete']}
			customRow={AdminListRowPhoto}
		/>
	</div>
</main>
