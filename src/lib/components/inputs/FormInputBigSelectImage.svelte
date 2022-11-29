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
	let filterImages = '';
	let loadImage = false;
	let imageSelected = {};

	if (value) {
		loadImage = true;
		imageSelected = images.find((image) => image.id == value);
	}
</script>

<label class="block text-sm font-medium text-gray-900 dark:text-gray-300" for={label}>{label}</label
>
<div
	class="gap-[34rem] overflow-hidden h-auto focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
>
	<div class="mb-6 flex flex-row h-12 justify-between">
		<AdminSearch placeholder="Ingrese texto alternativo.." bind:value={filterImages} />
		{#if loadImage}
			<img
				src={imageSelected.url}
				alt={imageSelected.alt}
				class="h-auto w-auto border border-green-600 rounded-md"
			/>
		{/if}
	</div>
	<div>
		<AdminModalImages
			{images}
			filter={filterImages.toLocaleLowerCase()}
			on:loadImage={({ detail }) => {
				imageSelected = detail;
				loadImage = true;
				value = imageSelected.id;
				console.log(loadImage, imageSelected);
			}}
		/>
	</div>
</div>
<!-- </AdminModal> -->
<!-- {/if} -->
