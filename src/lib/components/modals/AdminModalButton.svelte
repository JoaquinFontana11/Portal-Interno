<script>
	import { Photograph, Icon } from 'svelte-hero-icons';
</script>

<div class="text-center">
	<button
		class="w-16 h-16 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-100 focus:outline-none fixed top-12 right-6 rounded-full"
		type="button"
		data-drawer-target="drawer-example"
		data-drawer-show="drawer-example"
		aria-controls="drawer-example"
		on:click
	>
		<Icon
			src={Photograph}
			class="w-6 h-6 text-gray-100 transition duration-75 dark:text-indigo-700 group-hover:text-gray-900 dark:group-hover:text-white"
		/>
	</button>
</div>
