<script>
	import { slide, fly } from 'svelte/transition';
	import { Photograph, Icon } from 'svelte-hero-icons';
	let showDrawer = false;
</script>

<div class="text-center">
	<button
		class="w-16 h-16 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-100 focus:outline-none fixed top-12 right-6 rounded-full"
		type="button"
		data-drawer-target="drawer-example"
		data-drawer-show="drawer-example"
		aria-controls="drawer-example"
		on:click={() => (showDrawer = true)}
	>
		<Icon
			src={Photograph}
			class="w-6 h-6 text-gray-100 transition duration-75 dark:text-indigo-700 group-hover:text-gray-900 dark:group-hover:text-white"
		/>
	</button>
</div>
{#if showDrawer}
	<div
		id="drawer-example"
		class="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 top-0 right-0 shadow-md"
		tabindex="-1"
		aria-labelledby="drawer-label"
		transition:fly={{ duration: 100 }}
	>
		<button
			type="button"
			data-drawer-dismiss="drawer-example"
			aria-controls="drawer-example"
			class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
			on:click={() => (showDrawer = false)}
		>
			<svg
				aria-hidden="true"
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/></svg
			>
			<span class="sr-only">Close menu</span>
		</button>
		<slot />
	</div>
{/if}
