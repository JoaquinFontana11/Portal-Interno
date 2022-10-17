<script>
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';
	import AdminDrawer from '$lib/components/AdminDrawer.svelte';
</script>

<AdminNavbar />
<main class="ml-56 dark:bg-gray-900 bg-gray-100 h-screen relative overflow-y-scroll">
	<!-- <h1 class="text-5xl font-extrabold text-white absolute top-3 ml-3 ">Panel de administrador</h1> -->
	<!-- <div class=" bg-indigo-400 dark:bg-indigo-600  top-0 h-96 " /> -->
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<slot />
	</div>
</main>
<AdminDrawer />
