<script>
	import AdminListRow from './AdminListRow.svelte';
	// export let data;
	// export let headers;
	// export let attributes;

	const data = {
		data: [
			{
				nombre: 'juan',
				apellido: 'piso 10',
				estado: true
			},
			{
				nombre: 'juan',
				apellido: 'piso 10',
				estado: false
			},
			{
				nombre: 'juan',
				apellido: 'piso 10',
				estado: true
			},
			{
				nombre: 'juan',
				apellido: 'piso 10',
				estado: true
			},

			{
				nombre: 'juan',
				apellido: 'piso 10',
				estado: true
			},
			{
				nombre: 'juan',
				apellido: 'piso 10',
				estado: false
			}
		]
	};

	const headers = ['nombre', 'apellido', 'estado'];
	const attributes = ['nombre', 'apellido', 'estado'];
</script>

<table class="text-sm text-left text-gray-500 dark:text-gray-400 fixed w-full h-96 shadow-md">
	<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
		{#each headers as head}
			<th class="py-3 px-6 text-center">{head}</th>
		{/each}
		<th class="py-3 px-6 text-center">acciones</th>
	</thead>
	<tbody>
		{#each data.data as doc}
			<AdminListRow {doc} {attributes} on:modify-doc on:delete-doc />
		{/each}
	</tbody>
</table>
