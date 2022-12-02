<script lang="ts">
	export let photos: any[];
	import PhotoCard from './PhotoCard.svelte';

	// esta funcion calcula si la foto es grande o no segun el layout del grid
	// la secuencia de foto grande es: 0-5-6-11-12.. y asi. Usa matematica basica para entender esto pibe
	const isBig = (i) => {
		let odd = i % 2 == 0;
		let j = i;
		while (j > 0) {
			j = odd ? j - 1 : j - 5;
			odd = !odd;
		}
		return j == 0;
	};
</script>

<div
	class="grid grid-cols-4 auto-rows-fr grid-flow-dense gap-2 w-4/6 ml-auto mr-auto grid-container content-center"
>
	{#each photos as photo, i}
		<div class="photo-grid">
			<PhotoCard {photo} big={isBig(i)} />
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

	/* @media screen and (min-width: 64em) and (max-width: 89.9375em) { */
	/* 640 ~ 1439*/
	@media screen and (min-width: 64em) {
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

	/* 1440+ */
	/* @media print, screen and (min-width: 90em) {
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
	} */
</style>
