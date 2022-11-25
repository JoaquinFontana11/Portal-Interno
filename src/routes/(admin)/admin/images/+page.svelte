<script lang="ts">
	import type { PageData } from './$types';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';
	import AdminListRowImage from '$lib/components/admin/list/rows/AdminListRowImage.svelte';

	export let data: PageData;

	const deleteImage = (e: CustomEvent) => {
		console.log(e.detail);
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminList
			headers={['Imagen', 'Nombre', 'Texto alternativo']}
			data={JSON.parse(data.images)}
			on:delete-doc={deleteImage}
			caption="Imagenes"
			actions={['delete']}
			customRow={AdminListRowImage}
		/>
	</div>
</main>
