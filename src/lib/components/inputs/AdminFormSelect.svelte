<script>
	export let value;
	export let label;
	export let required = false;
	export let options;
</script>

<div>
	<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for={label}
		>{label}</label
	>
	<select
		id={label}
		class="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		{required}
		bind:value
	>
		<option selected>Elija una opcion</option>
		{#each options as option}
			<option value={option.value}>{option.name}</option>
		{/each}
	</select>
</div>
