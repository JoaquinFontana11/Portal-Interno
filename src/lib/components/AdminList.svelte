<script>
	import { createEventDispatcher } from 'svelte';
	import AdminListRow from './AdminListRow.svelte';
	export let data;
	export let headers;
	export let attributes;

	const distpach = createEventDispatcher();

	const deleteEvent = (e) => {
		distpach('delete-doc', { id: e.detail.id });
	};
	const modifyEvent = (e) => {
		distpach('modify-doc', { id: e.detail.id, doc: e.detail.doc });
	};
</script>

<!-- {data} -->
<table class="text-sm text-left text-gray-500 dark:text-gray-400 fixed w-full h-full shadow-md">
	<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
		{#each headers as head}
			<th class="py-3 px-6 text-center">{head}</th>
		{/each}
		<th class="py-3 px-6 text-center">acciones</th>
	</thead>
	<tbody>
		{#each data as doc}
			<AdminListRow {doc} {attributes} on:modify-doc={modifyEvent} on:delete-doc={deleteEvent} />
		{/each}
	</tbody>
</table>
