<script lang="ts">
	import type { LayoutData } from './$types';
	import AdminModal from '../modals/AdminModal.svelte';
	import { validateEmptyInput } from './validators';
	import AdminSearch from '../admin/AdminSearch.svelte';
	import AdminModalImages from '../modals/AdminModalImages.svelte';

	export let images: LayoutData;
	export let value: number = 0;
	export let label: string;
	export let required = false;
	let selectImage = false;
	let filterImages = '';
	let loadImage = false;
	let imageSelected = {};

	if (value) {
		loadImage = true;
		imageSelected = images.find((image) => image.id == value);
	}

	let styleMessage = 'hidden';
	let errorMsg = '';
</script>

<div>
	<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for={label}
		>{label}</label
	>
	<div
		class=" flex flex-row gap-[34rem] overflow-hidden max-h-12 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
	>
		<button
			id={label}
			type="button"
			value=""
			class=" w-auto m-0 focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg px-5 py-1.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 inline"
			on:click={() => {
				selectImage = true;
			}}
			><svg
				class="w-4 h-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				/></svg
			></button
		>
		{#if loadImage}
			<div class="flex flex-row gap-4 justify-end">
				<span class="flex">{imageSelected.alt}</span>
				<img src={imageSelected.url} alt={imageSelected.alt} class="h-auto w-auto" />
			</div>
		{/if}
	</div>
	<label class={styleMessage} for={label}>{errorMsg}</label>
</div>
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
		<AdminModalImages
			{images}
			filter={filterImages}
			on:loadImage={({ detail }) => {
				console.log(detail);
				imageSelected = detail;
				selectImage = false;
				loadImage = true;
				value = imageSelected.id;
			}}
		/>
	</AdminModal>
{/if}
