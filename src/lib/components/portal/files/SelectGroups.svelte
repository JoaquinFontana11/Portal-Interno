<script lang="ts">
	export let placeholder = 'Search...';
	export let value: string;
</script>

<div class="relative md:block">
	<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
		<svg
			class="w-5 h-5 text-gray-500"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
			/></svg
		>
	</div>
	<select
		name="select-groups"
		id="select-groups"
		class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-blue-500 outline-none"
		bind:value
	>
		<option value="">TODOS</option>
		<option value="DPMA">DPMA</option>
		<option value="IOP">IOP</option>
		<option value="PMO">PMO</option>
		<option value="MC">MC</option>
		<option value="SP">SP</option>
		<option value="CYC">CYC</option>
	</select>
</div>
