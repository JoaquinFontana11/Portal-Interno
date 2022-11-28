<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import AdminModalImage from './AdminModalImage.svelte';
	export let images: string;
	export let filter: string;
	console.log('IMAGENES');
	console.log(images);
</script>

<div class="grid grid-cols-4 gap-1 ">
	{#each images.filter((image) => image.alt.includes(filter)) as image (image._id)}
		<div in:fade={{ duration: 300 }} animate:flip={{ duration: 300 }}>
			<AdminModalImage src={image.url} alt={image.alt} />
		</div>
	{:else}
		<p>No hay ninguna imagen cargada</p>
	{/each}
</div>
