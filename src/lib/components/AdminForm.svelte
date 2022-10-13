<script>
	import AdminFormInput from './AdminFormInput.svelte';
	import AdminFormSelect from './AdminFormSelect.svelte';
	import AdminFormFileInput from './AdminFormFileInput.svelte';
	import AdminFormEditor from './AdminFormEditor.svelte';

	export let components;
	export let title;

	const options = [
		{
			value: '10',
			name: 'diez'
		},
		{
			value: '5',
			name: 'cinco'
		}
	];
</script>

<form class="flex flex-col gap-3 bg-gray-200 dark:bg-gray-800 p-10">
	<AdminFormInput label="input 1" type="text" required="true" />
	<AdminFormInput label="input 2" type="number" />
	<AdminFormInput label="input 3" type="password" />
	<AdminFormSelect label="select" {options} />
	<AdminFormFileInput label="input de imagen" />
	<AdminFormEditor label="editor de texto" />
	<button
		class="w-full m-0 focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
	>
		Enviar
	</button>
</form>
