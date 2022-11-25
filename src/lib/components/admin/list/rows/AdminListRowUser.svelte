<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let doc: any;
	export let attributes: string[];
	export let actions: string[];

	const distpach = createEventDispatcher();

	const deleteEvent = () => {
		distpach('delete-doc', { id: doc._id, doc: doc });
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
			<td class="h-1 py-3 px-6 text-center">
				<div class="flex items-center justify-center">
					<div
						class={`h-2.5 w-2.5 rounded-full ${doc[atr] ? 'bg-green-600' : 'bg-red-600'} mr-2`}
					/>
					{`${doc[atr] ? 'Activo' : 'Inactivo'}`}
				</div>
			</td>
		{:else}
			<td class="text-center h-1 py-3 px-6 t"><span>{doc[atr]}</span></td>
		{/if}
	{/each}
	<td class="h-1 py-3 px-6 text-center">
		<div class="flex items-center w-full justify-center gap-2">
			{#if actions.includes('edit')}
				<button
					href="#"
					class="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
					on:click={modifyEvent}>Editar</button
				>
			{/if}
			{#if actions.includes('delete')}
				<button
					href="#"
					class="font-medium text-red-600 dark:text-red-500 hover:underline"
					on:click={deleteEvent}>Eliminar</button
				>
			{/if}
		</div>
	</td>
</tr>
