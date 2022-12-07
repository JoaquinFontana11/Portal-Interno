<script lang="ts">
	import AdminNavbar from '$lib/components/admin/AdminNavbar.svelte';
</script>

<AdminNavbar />
<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-hidden">
	<div
		class="p-10 pt-20 w-full h-full absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 overflow-y-scroll "
	>
		<slot />
	</div>
</main>
