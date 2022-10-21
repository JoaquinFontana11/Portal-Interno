<script>
	export let data;

	import AdminNavbar from '$lib/components/AdminNavbar.svelte';
	// import AdminDrawer from '$lib/components/drawer/AdminDrawer.svelte';
	// import AdminDrawerImageList from '$lib/components/drawer/AdminDrawerImageList.svelte';
</script>

<AdminNavbar user={JSON.parse(data.user)} />
<slot />
<!-- <AdminDrawer>
	<AdminDrawerImageList images={data.images} />
</AdminDrawer> -->
