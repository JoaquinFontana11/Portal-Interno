<script lang="ts">
	import type { PageData } from './$types';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';
	import AdminListRowNovelty from '$lib/components/admin/list/rows/AdminListRowNovelty.svelte';

	export let data: PageData;
	const deleteNovelty = (e: CustomEvent) => {
		console.log(e.detail);
	};
	const modifyNovelty = (e: CustomEvent) => {
		console.log(e.detail);
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminList
			headers={['Titulo', 'Fecha', 'Pagina', 'Imagen']}
			data={JSON.parse(data.noveltys)}
			on:delete-doc={deleteNovelty}
			on:modify-doc={modifyNovelty}
			caption="Novedades"
			actions={['delete', 'edit']}
			customRow={AdminListRowNovelty}
		/>
	</div>
</main>
