<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
	export let doc: any;
	export let attributes: string[];
	export let actions: string[];

	const distpach = createEventDispatcher();

	const deleteEvent = () => {
		distpach('delete-doc', { id: doc.id, doc: doc });
	};
	const modifyEvent = () => {
		distpach('modify-doc', { id: doc.id, doc: doc });
	};
</script>

<tr
	class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
	in:fade={{ duration: 200 }}
	out:fly={{ duration: 300, x: 100 }}
>
	{#each attributes as atr, index (atr)}
		<td class="h-1 py-3 px-6 text-center">
			{#if typeof doc[atr] == 'boolean'}
				<div class="flex items-center justify-center">
					<div
						class={`h-2.5 w-2.5 rounded-full ${doc[atr] ? 'bg-green-600' : 'bg-red-600'} mr-2`}
					/>
					{`${doc[atr] ? 'Activo' : 'Inactivo'}`}
				</div>
			{:else}
				<span>{doc[atr]}</span>
			{/if}
		</td>
		<!-- </div> -->
	{/each}
	<td class="h-1 py-3 px-6 text-center" in:fade={{ duration: 300 }}>
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
