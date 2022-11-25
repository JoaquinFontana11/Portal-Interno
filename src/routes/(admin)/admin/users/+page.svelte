<script lang="ts">
	import type { PageData } from './$types';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';

	export let data: PageData;
</script>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminList
			headers={['Nombre', 'Nombre de usuario', 'Rol']}
			attributes={['name', 'description', 'extension', 'order']}
			data={JSON.parse(data.files).map((file) => {
				return {
					_id: file._id,
					name: file.name.split('.').at(0),
					extension: file.name.split('.').at(-1),
					order: file.order,
					description: file.description
				};
			})}
			on:delete-doc={deleteFile}
			caption="Archivos"
			actions={['delete']}
		/>
		{data.users}
	</div>
</main>
