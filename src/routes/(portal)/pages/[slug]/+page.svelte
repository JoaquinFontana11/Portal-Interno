<script lang="ts">
	import Section from '$lib/components/portal/Section.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const page = JSON.parse(data.page);
</script>

<Section
	title={page.title}
	overview=""
	config={{
		titleColor: 'text-sky-400',
		backgroundColor: 'bg-transparent'
	}}
>
	<div
		class="bg-neutral-50  rounded-lg shadow-lg p-10 gap-10 relative z-10 w-11/12 m-auto h-11/12 mt-10 mb-10 page-content"
	>
		{@html page.body}
	</div>
</Section>
