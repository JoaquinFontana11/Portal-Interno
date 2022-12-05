<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import AdminModalImageCopy from './AdminModalImageCopy.svelte';
	export let images: any;
	export let filter: string;
</script>

<div class="grid grid-cols-4 gap-1 ">
	{#each images.filter((image) => image.alt.includes(filter)) as image (image.id)}
		<div in:fade={{ duration: 300 }} animate:flip={{ duration: 300 }}>
			<AdminModalImageCopy src={image.url} alt={image.alt} />
		</div>
	{:else}
		<p>No hay ninguna imagen cargada</p>
	{/each}
</div>
