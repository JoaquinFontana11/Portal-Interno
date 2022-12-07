<script lang="ts">
	import AdminNavbar from '$lib/components/admin/AdminNavbar.svelte';
</script>

<AdminNavbar />
<main
	class="relative ml-56 dark:bg-gray-900 bg-neutral-50 h-screen pb-10 overflow-y-hidden overflow-x-hidden"
>
	<div class="p-10 pt-20 pb-10  w-full h-screen overflow-y-scroll">
		<slot />
	</div>
</main>
