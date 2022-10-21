<script>
	import { Filter } from 'svelte-hero-icons';
	import AdminDrawerImage from './AdminDrawerImage.svelte';
	export let images;
</script>

<div class="flex flex-col mt-10">
	<span>Click a una imagen para copiar su url!</span>
	{#each JSON.parse(images).filter((image) => image.url.includes('pages')) as image}
		<AdminDrawerImage src={image.url} alt={image.alt} width={image.width} height={image.height} />
	{/each}
</div>
