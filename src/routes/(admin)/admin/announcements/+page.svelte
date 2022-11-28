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
