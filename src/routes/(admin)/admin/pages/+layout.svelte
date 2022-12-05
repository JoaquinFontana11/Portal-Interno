<script lang="ts">
	import type { LayoutData } from './$types';
	import { Photograph, Folder } from 'svelte-hero-icons';
	import AdminModal from '$lib/components/modals/AdminModal.svelte';
	import AdminModalImagesCopy from '$lib/components/modals/AdminModalImagesCopy.svelte';
	import AdminModalButton from '$lib/components/modals/AdminModalButton.svelte';
	import AdminSearch from '$lib/components/admin/AdminSearch.svelte';
	import AdminModalFiles from '$lib/components/modals/AdminModalFiles.svelte';
	export let data: LayoutData;

	let modalImages = false;
	let modalFiles = false;
	let filterImages = '';
	let filterFiles = '';
</script>

<slot />

<AdminModalButton
	pos={1}
	icon={Photograph}
	on:click={() => {
		modalImages = true;
	}}
/>
<AdminModalButton
	pos={2}
	icon={Folder}
	on:click={() => {
		modalFiles = true;
	}}
/>
{#if modalImages}
	<AdminModal
		title="Imagenes"
		on:close-modal={() => {
			modalImages = false;
		}}
	>
		<AdminSearch
			slot="header"
			placeholder="Ingrese texto alternativo.."
			bind:value={filterImages}
		/>
		<AdminModalImagesCopy images={JSON.parse(data.images)} filter={filterImages} />
	</AdminModal>
{/if}
{#if modalFiles}
	<AdminModal
		title="Archivos"
		on:close-modal={() => {
			modalFiles = false;
		}}
	>
		<AdminSearch
			slot="header"
			placeholder="Ingrese nombre del archivo.."
			bind:value={filterFiles}
		/>
		<AdminModalFiles files={JSON.parse(data.files)} filter={filterFiles} />
	</AdminModal>
{/if}
