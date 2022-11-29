<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import AdminModalImage from './AdminModalImage.svelte';
	import { createEventDispatcher } from 'svelte';

	export let images: string;
	export let filter: string;
	const dispatch = createEventDispatcher();
</script>

<div class="grid grid-cols-4 gap-1 ">
	{#each images.filter((image) => image.alt.includes(filter)) as image (image.id)}
		<div in:fade={{ duration: 300 }} animate:flip={{ duration: 300 }}>
			<AdminModalImage
				src={image.url}
				alt={image.alt}
				id={image.id}
				on:loadImage={({ detail }) => {
					dispatch('loadImage', detail);
				}}
			/>
		</div>
	{:else}
		<p>No hay ninguna imagen cargada</p>
	{/each}
</div>
