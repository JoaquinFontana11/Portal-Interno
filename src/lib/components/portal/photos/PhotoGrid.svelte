<script lang="ts">
	const images = ['/img/1669733562924.png'];
</script>

<div class="grid grid-cols-3 auto-rows-fr grid-flow-dense gap-10">
	{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as item, i}
		<div
			class=" bg-sky-300 aspect-square photo-grid"
			style="background-image: url('{images[0]}'); background-size: cover"
		>
			Photo {item}
		</div>
	{/each}
</div>

<style>
	.photo-grid:nth-child(6n + 1),
	.photo-grid:nth-child(6n + 6) {
		grid-area: span 2 / span 2;
	}
	.photo-grid:nth-child(6n + 5) {
		grid-column: 1;
	}
</style>
