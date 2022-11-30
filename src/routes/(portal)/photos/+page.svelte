<script lang="ts">
	import type { PageData } from './$types';
	import Section from '$lib/components/portal/Section.svelte';
	import PhotoGrid from '$lib/components/portal/photos/PhotoGrid.svelte';

	export let data: PageData;
</script>

<Section
	title="Fotos de la DPMA!"
	config={{
		titleColor: 'text-sky-400',
		backgroundColor: 'bg-transparent'
	}}
>
	<!-- <div class="bg-neutral-50 rounded-lg shadow-lg p-10 flex flex-col z-10 relative"> -->
	<PhotoGrid photos={JSON.parse(data.photos)} />
	<!-- </div> -->
</Section>
