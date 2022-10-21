<script>
	import { createEventDispatcher } from 'svelte';
	export let images = '';

	const dispatch = createEventDispatcher();
	let urlSelected = '';

	const selectImage = (url) => {
		urlSelected = url;
		dispatch('image-picked', {
			url: urlSelected
		});
	};
</script>

<p class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Selector de imagen</p>

<div class="grid grid-cols-4 h-112 overflow-y-scroll gap-1">
	{#each images as image}
		<a href="#" class="mt-1 mb-1 relative " on:click={(e) => selectImage(image.url)}>
			<figure class="relative max-w-sm transition-all cursor-pointer flex justify-center">
				<img
					class={`max-w-full h-auto rounded-lg duration-300 border-4 hover:border-green-600 ${
						urlSelected == image.url ? 'border-green-600' : ''
					}`}
					src={image.url}
					alt={images.alt}
					width="200px"
				/>
			</figure>
		</a>
	{/each}
</div>
