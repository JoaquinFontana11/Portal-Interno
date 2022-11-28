<script lang="ts">
	import type { LayoutData } from './$types';
	import AdminModal from '../modals/AdminModal.svelte';
	import { validateEmptyInput } from './validators';
	import AdminSearch from '../admin/AdminSearch.svelte';
	import AdminModalImages from '../modals/AdminModalImages.svelte';

	export let value: LayoutData;
	export let label: string;
	export let required = false;
	let selectImage = false;
	let filterImages = '';
	console.log('SelectImage');
	console.log(value);

	const succes = {
		input:
			'bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500',
		message: 'block text-green-600 dark:text-green-500 mb-2 text-sm font-medium'
	};

	const error = {
		input:
			'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',
		message: 'block text-red-600 dark:text-red-500 mb-2 text-sm font-medium'
	};

	let styleInput =
		' m-0 focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 flex justify-center';
	let styleMessage = 'hidden';
	let errorMsg = '';
	const validateInput = (e: Event) => {
		({
			message: errorMsg,
			inputStyle: styleInput,
			messageStyle: styleMessage
		} = validateEmptyInput(value, error, succes));
	};
</script>

<div>
	<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for={label}
		>{label}</label
	>
	<input
		id={label}
		type="button"
		value="Agregar Foto"
		class={styleInput}
		on:click={() => {
			selectImage = true;
		}}
	/>
	<label class={styleMessage} for={label}>{errorMsg}</label>
	{#if selectImage}
		<AdminModal
			title="Imagenes"
			on:close-modal={() => {
				selectImage = false;
			}}
		>
			<AdminSearch
				slot="header"
				placeholder="Ingrese texto alternativo.."
				bind:value={filterImages}
			/>
			<AdminModalImages images={value} filter={filterImages} />
		</AdminModal>
	{/if}
</div>
