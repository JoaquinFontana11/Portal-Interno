<script lang="ts">
	import type { PageData } from './$types';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';
	import AdminListRowUser from '$lib/components/admin/list/rows/AdminListRowUser.svelte';

	export let data: PageData;

	const deleteUser = (e: CustomEvent) => {
		console.log(e.detail);
	};
	const modifyUser = (e: CustomEvent) => {
		console.log(e.detail);
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminList
			headers={['Nombre', 'Nombre de usuario', 'Rol']}
			data={JSON.parse(data.users)}
			on:delete-doc={deleteUser}
			on:modify-doc={modifyUser}
			caption="Archivos"
			actions={['delete', 'edit']}
			customRow={AdminListRowUser}
		/>
	</div>
</main>
