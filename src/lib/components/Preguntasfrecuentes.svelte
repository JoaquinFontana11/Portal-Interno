<script>
	export let entry;
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
</script>

<button
	on:click={toggle}
	aria-expanded={isOpen}
	class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
	<svg id="iconoSignoPregunta"
		class="w-5 h-5 mr-2 shrink-0"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg">
		<path
			fill-rule="evenodd"
			d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/>
	</svg>
	{entry[0]}
    <svg id="iconoDesplegable" style="tran"  width="20" height="20" fill="none" 
			stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
			 viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7">
		</path></svg>
</button>

{#if isOpen}
	<ul class="">
		{#each entry[1] as item}
			<li>{item}</li>
		{/each}
	</ul>
{/if}

<style>
	svg#iconoSignoPregunta {
		transition: transform 0.5s ease-in;
	}

	[aria-expanded='true'] svg#iconoSignoPregunta {
		transform: rotate(1turn);
	}

    svg#iconoDesplegable {
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg#iconoDesplegable {
		transform: rotate(.25turn);
	}
</style>
