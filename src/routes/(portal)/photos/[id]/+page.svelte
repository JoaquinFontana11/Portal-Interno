<script lang="ts">
	import type { PageData } from './$types';
	import Section from '$lib/components/portal/Section.svelte';
	import PhotoSection from '$lib/components/portal/photos/PhotoSection.svelte';
	export let data: PageData;

	const photo = JSON.parse(data.photo);
</script>

<Section
	title=""
	config={{
		titleColor: 'text-sky-400',
		backgroundColor: 'bg-transparent'
	}}
>
	<PhotoSection {photo} user={JSON.parse(data.user)} />
</Section>
