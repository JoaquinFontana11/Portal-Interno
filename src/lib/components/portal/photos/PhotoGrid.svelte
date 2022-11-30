<script lang="ts">
	export let photos: any[];
	import PhotoCard from './PhotoCard.svelte';
</script>

<div
	class="grid grid-cols-4 auto-rows-fr grid-flow-dense gap-10 w-5/6 ml-auto mr-auto grid-container"
>
	{#each photos as photo, i}
		<div class="photo-grid">
			<PhotoCard {photo} big={(i + '').endsWith('0') || (i + '').endsWith('9')} />
		</div>
	{/each}
</div>

<style>
	@media screen and (max-width: 64em) {
		/* 640- */
		.grid-container {
			grid-template-columns: repeat(1, 1fr);
		}
	}

	@media screen and (min-width: 64em) and (max-width: 89.9375em) {
		/* 640 ~ 1439*/
		.grid-container {
			grid-template-columns: repeat(3, 1fr);
		}
		.photo-grid:nth-child(6n + 1),
		.photo-grid:nth-child(6n + 6) {
			grid-area: span 2 / span 2;
		}
		.photo-grid:nth-child(6n + 5) {
			grid-column: 1;
		}
	}

	@media print, screen and (min-width: 90em) {
		/* 1440+ */
		.grid-container {
			grid-template-columns: repeat(4, 1fr);
		}
		.photo-grid:nth-child(10n + 1),
		.photo-grid:nth-child(10n + 10) {
			grid-area: span 2 / span 2;
		}
		.photo-grid:nth-child(10n + 8) {
			grid-column: 1;
		}
		.photo-grid:nth-child(10n + 9) {
			grid-column: 2;
		}
	}
</style>
