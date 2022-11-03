<script>
	import { Photograph, Folder } from 'svelte-hero-icons';
	import AdminModal from '$lib/components/modals/AdminModal.svelte';
	import AdminModalImages from '$lib/components/modals/AdminModalImages.svelte';
	import AdminModalButton from '$lib/components/modals/AdminModalButton.svelte';
	import AdminSearchInput from '$lib/components/AdminSearchInput.svelte';
	import AdminModalFiles from '$lib/components/modals/AdminModalFiles.svelte';
	export let data;

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
		<AdminSearchInput
			slot="header"
			placeholder="Ingrese texto alternativo.."
			bind:value={filterImages}
		/>
		<AdminModalImages images={data.images} filter={filterImages} />
	</AdminModal>
{/if}
{#if modalFiles}
	<AdminModal
		title="Archivos"
		on:close-modal={() => {
			modalFiles = false;
		}}
	>
		<AdminSearchInput
			slot="header"
			placeholder="Ingrese nombre del archivo.."
			bind:value={filterFiles}
		/>
		<AdminModalFiles files={data.files} filter={filterFiles} />
	</AdminModal>
{/if}
