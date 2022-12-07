<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';
	export let value: string;
	export let options: Array<Object>;
	export let icon: IconSource;
</script>

<div class="relative md:block w-32">
	<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
		<Icon src={icon} class="w-6 h-6 text-gray-500" />
	</div>
	<select
		name="select-groups"
		id="select-groups"
		class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-blue-500 outline-none"
		bind:value
	>
		<option value="">Todos</option>
		{#if options}
			{#each options as option}
				<option value={option.value}>{option.name}</option>
			{/each}
		{/if}
	</select>
</div>
