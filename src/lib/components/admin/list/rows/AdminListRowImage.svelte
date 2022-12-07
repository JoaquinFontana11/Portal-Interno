<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
	export let doc: any;
	export let attributes: string[];
	export let actions: string[];

	const distpach = createEventDispatcher();

	const deleteEvent = () => {
		distpach('delete-doc', { id: doc.id });
	};
	const modifyEvent = () => {
		distpach('modify-doc', { id: doc.id, doc: doc });
	};
</script>

<tr
	class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
	in:fade={{ duration: 200 }}
>
	<td class=" py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white flex justify-center">
		<img
			class="w-16 rounded"
			src={!doc.url || doc.url == '#' ? '/img/test.png' : doc.url}
			alt="foto de perfil"
		/>
	</td>
	<td class="text-center h-1 py-3 px-6 t"><span>{doc.name}</span></td>
	<td class="text-center h-1 py-3 px-6 t"><span>{doc.alt}</span></td>
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
