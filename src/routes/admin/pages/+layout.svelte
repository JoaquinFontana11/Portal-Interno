<script>
	import AdminDrawer from '$lib/components/drawer/AdminDrawer.svelte';
	import AdminDrawerImageList from '$lib/components/drawer/AdminDrawerImageList.svelte';
	export let data;
</script>

<slot />
<AdminDrawer>
	<AdminDrawerImageList images={data.images} />
</AdminDrawer>
