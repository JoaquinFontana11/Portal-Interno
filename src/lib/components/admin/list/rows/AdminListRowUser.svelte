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
>
	<td class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
		<img class="w-10 h-10 rounded-full" src={doc.Image?.url || '/img/test.png'} alt={``} />
		<div class="pl-3">
			<div class="text-base font-semibold">{`${doc.name} ${doc.lastname}`}</div>
			<div class="font-normal text-gray-500">{doc.email}</div>
		</div>
	</td>
	<td class="text-center h-1 py-3 px-6 t"><span>{doc.username}</span></td>
	<td class="text-center h-1 py-3 px-6 t"><span>{doc.role}</span></td>
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
