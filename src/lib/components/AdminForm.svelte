<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import AdminFormInputText from './inputs/AdminFormInputText.svelte';
	import AdminFormInputNumber from './inputs/AdminFormInputNumber.svelte';
	import AdminFormInputPassword from './inputs/AdminFormInputPassword.svelte';
	import AdminFormSelect from './inputs/AdminFormSelect.svelte';
	import AdminFormFileInput from './inputs/AdminFormFileInput.svelte';
	import AdminFormEditor from './inputs/AdminFormEditor.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	export let components;
	export let title;
	export let submitMessage;
	export let loading;

	const handlerSubmit = async (e) => {
		dispatch('custom-submit', {
			data: components.map((component) => {
				return { input: component.name, value: component.value };
			})
		});
	};
</script>

<form
	class="flex flex-col gap-3 bg-gray-200 dark:bg-gray-800 p-10"
	on:submit|preventDefault={handlerSubmit}
>
	<legend>{title}</legend>
	{#each components as component}
		{#if component.type == 'text'}
			<AdminFormInputText label={component.label} bind:value={component.value} />
		{:else if component.type == 'number'}
			<AdminFormInputNumber label={component.label} bind:value={component.value} />
		{:else if component.type == 'password'}
			<AdminFormInputPassword label={component.label} bind:value={component.value} />
		{:else if component.type == 'select'}
			<AdminFormSelect
				label={component.label}
				options={component.options}
				bind:value={component.value}
			/>
		{:else if component.type == 'file'}
			<AdminFormFileInput label={component.label} />
		{:else if component.type == 'editor'}
			<AdminFormEditor label={component.label} />
		{/if}
	{/each}
	<button
		class="w-full m-0 focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 flex justify-center"
	>
		{#if loading}
			<Spinner />
		{:else}
			{submitMessage}
		{/if}
	</button>
</form>
