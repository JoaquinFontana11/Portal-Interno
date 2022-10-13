<script>
	import { createEventDispatcher } from 'svelte';
	export let doc;
	export let attributes;

	const distpach = createEventDispatcher();

	const deleteEvent = () => {
		distpach('delete-doc', { id: doc._id });
	};
	const modifyEvent = () => {
		distpach('modify-doc', { id: doc._id, doc: doc });
	};
</script>

<tr
	class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
>
	{#each attributes as atr}
		{#if typeof doc[atr] == 'boolean'}
			<td class="flex items-center h-full w-full justify-center">
				<div class={`h-2.5 w-2.5 rounded-full ${doc[atr] ? 'bg-green-600' : 'bg-red-600'} mr-2`} />
				{`${doc[atr] ? 'Activo' : 'Inactivo'}`}
			</td>
		{:else}
			<td class="text-center">{doc[atr]}</td>
		{/if}
	{/each}
	<td>
		<div class="flex items-center h-full w-full justify-center gap-2">
			<a href="#" class="font-medium text-indigo-600 dark:text-indigo-500 hover:underline">Editar</a
			>
			<a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Eliminar</a>
		</div>
	</td>
</tr>
