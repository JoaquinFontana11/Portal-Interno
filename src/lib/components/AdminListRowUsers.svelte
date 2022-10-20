<script>
	import { createEventDispatcher } from 'svelte';
	export let doc;
	export let actions;

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
	<td class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
		<img
			class="w-10 h-10 rounded-full"
			src={doc.profilePhoto == '#' ? '/img/test.png' : doc.profilePhoto}
			alt="foto de perfil"
		/>
		<div class="pl-3">
			<div class="text-base font-semibold">{doc.username}</div>
			<div class="font-normal text-gray-500">{doc.email}</div>
		</div>
	</td>
	<td class="h-1 py-3 px-6 text-center"><span>{doc.rol}</span></td>
	<td class="h-1 py-3 px-6 text-center">
		<div class="flex items-center w-full justify-center gap-2">
			{#if actions.includes('edit')}
				<a
					href="#"
					class="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
					on:click={modifyEvent}>Editar</a
				>
			{/if}
			{#if actions.includes('delete')}
				<a
					href="#"
					class="font-medium text-red-600 dark:text-red-500 hover:underline"
					on:click={deleteEvent}>Eliminar</a
				>
			{/if}
		</div>
	</td>
</tr>
