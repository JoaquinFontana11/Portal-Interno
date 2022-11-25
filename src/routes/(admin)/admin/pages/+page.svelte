<script lang="ts">
	import type { PageData } from './$types';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';

	export let data: PageData;
	const deletePage = (e: CustomEvent) => {
		console.log(e.detail);
	};
	const modifyPage = (e: CustomEvent) => {
		console.log(e.detail);
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminList
			headers={['Titulo', 'Slug', 'Proyecto']}
			attributes={['title', 'slug', 'project']}
			data={JSON.parse(data.pages)}
			on:delete-doc={deletePage}
			on:modify-doc={modifyPage}
			caption="Usuarios"
			actions={['delete', 'edit']}
		/>
	</div>
</main>
