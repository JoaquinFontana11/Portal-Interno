<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { type ComponentType } from 'svelte';
	import AdminListRow from './rows/AdminListRow.svelte';
	export let data: any;
	export let headers: string[];
	export let attributes: string[];
	export let actions: string[] = ['edit', 'delete'];
	export let caption: string = '';
	export let customRow: ComponentType | null = null; // podemos pasar una fila customizada si la tabla tiene que ser distinta
	export let deleteAction: string;

	const dispatch = createEventDispatcher();

	const deleteEvent = async (e: CustomEvent) => {
		const body = new FormData();
		body.append('id', e.detail.id);
		await fetch(`?/delete`, {
			method: 'POST',
			body
		});
	};

	const modifyEvent = (e: CustomEvent) => {
		dispatch('modify-doc', { id: e.detail.id, doc: e.detail.doc });
	};
</script>

<table class="text-sm text-left text-gray-500 dark:text-gray-400 shadow-md ml-auto mr-auto">
	<caption
		class="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 dark:text-gray-400 w-auto"
	>
		{caption}
	</caption>
	<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
		{#each headers as head}
			<th class="py-3 px-6 text-center">{head}</th>
		{/each}
		<th class="py-3 px-6 text-center">acciones</th>
	</thead>
	<tbody>
		{#each data as doc}
			{#if !customRow}
				<AdminListRow
					{doc}
					{attributes}
					on:modify-doc={modifyEvent}
					on:delete-doc={deleteEvent}
					{actions}
				/>
			{:else}
				<svelte:component
					this={customRow}
					{doc}
					{attributes}
					on:modify-doc={modifyEvent}
					on:delete-doc={deleteEvent}
					{actions}
				/>
			{/if}
		{/each}
	</tbody>
</table>
