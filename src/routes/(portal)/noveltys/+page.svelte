<script lang="ts">
	import type { PageData } from './$types';
	import Section from '$lib/components/portal/Section.svelte';
	import NoveltyGrid from '$lib/components/portal/noveltys/NoveltyGrid.svelte';

	export let data: PageData;
</script>

<Section
	title="Ultimas novedades"
	config={{
		titleColor: 'text-sky-400',
		backgroundColor: 'bg-transparent'
	}}
>
	<!-- <div class="bg-neutral-50 rounded-lg shadow-lg p-10 flex flex-col z-10 relative"> -->
	<NoveltyGrid noveltys={JSON.parse(data.noveltys)} />
	<!-- </div> -->
</Section>
