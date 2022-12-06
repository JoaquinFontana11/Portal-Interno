<script lang="ts">
	import { type ComponentType } from 'svelte';
	import { Search } from 'svelte-hero-icons';
	import AdminSearch from '../AdminSearch.svelte';
	import CustomSelect from '../../CustomSelect.svelte';
	import AdminListRow from './rows/AdminListRow.svelte';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
	export let data: any;
	export let headers: string[];
	export let attributes: string[];
	export let actions: string[] = ['edit', 'delete'];
	export let deleteAction: string = 'delete';
	export let caption: string = '';
	export let customRow: ComponentType | null = null; // podemos pasar una fila customizada si la tabla tiene que ser distinta
	export let options: Array<Object>;
	export let iterators: Object;
	export let placeholder: string;

	let searchFilter = '';
	let selectFilter = '';
	console.log('----------------------------------------------------------');
	console.log(options);

	const deleteEvent = async (e: CustomEvent) => {
		console.log(e);
		const body = new FormData();
		body.append('id', e.detail.id);
		await fetch(`?/${deleteAction}`, {
			method: 'POST',
			body
		});

		location.reload();
	};

	const modifyEvent = (e: CustomEvent) => {
		location.href = `${location.href}/${e.detail.id}`;
	};
</script>

<div
	class="relative self-end flex gap-3 border shadow-md bg-white justify-between p-3 rounded-xl mx-auto w-128 mb-5"
>
	<AdminSearch {placeholder} bind:value={searchFilter} />
	{#if options.length != 0 && iterators.select[0] != 'null'}
		<CustomSelect icon={Search} {options} bind:value={selectFilter} />
	{/if}
</div>

<table
	class="text-sm text-left text-gray-500 dark:text-gray-400 shadow-xl  ml-auto mr-auto w-[50rem] min-w-[50rem] max-w-[50rem]"
>
	<caption
		class="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 dark:text-gray-400 w-auto"
	>
		{caption}
	</caption>
	<thead
		class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-[50rem] min-w-[50rem] max-w-[50rem]"
	>
		{#each headers as head}
			<th class="py-3 px-6 text-center">{head}</th>
		{/each}
		<th class="py-3 px-6 text-center">acciones</th>
	</thead>
	<tbody>
		{#each data.filter((doc) => (iterators.search.length == 2 ? doc[iterators.search[0]][iterators.search[1]]
							.toLowerCase()
							.includes(searchFilter.toLowerCase()) : doc[iterators.search[0]]
							.toLowerCase()
							.includes(searchFilter.toLowerCase())) && ((iterators.select.length == 2 ? doc[iterators.select[0]] == selectFilter || doc[iterators.select[1]] == selectFilter : doc[iterators.select[0]] == selectFilter) || selectFilter == '')) as doc}
			{#if !customRow}
				{#if caption == 'Paginas' && !doc.slug.includes('pages')}
					<AdminListRow
						{doc}
						{attributes}
						on:modify-doc={modifyEvent}
						on:delete-doc={deleteEvent}
						actions={['edit']}
					/>
				{:else}
					<AdminListRow
						{doc}
						{attributes}
						on:modify-doc={modifyEvent}
						on:delete-doc={deleteEvent}
						{actions}
					/>
				{/if}
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
