<script lang="ts">
	import Section from '$lib/components/portal/Section.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const page = JSON.parse(data.page);
	console.log(page);
</script>

<Section
	title={page.title}
	overview=""
	config={{
		titleColor: 'text-gray-900',
		backgroundColor: 'bg-transparent'
	}}
>
	<div class="text-lg flex flex-col gap-3">
		{@html page.body}
	</div>
</Section>
