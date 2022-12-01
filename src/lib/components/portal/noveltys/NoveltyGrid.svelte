<script lang="ts">
	import NoveltyCard from './NoveltyCard.svelte';

	export let noveltys;
</script>

<div class="grid grid-cols-5">
	{#each noveltys as novelty}
		<NoveltyCard {novelty} />
	{/each}
</div>
