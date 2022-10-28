<script>
	import AdminModal from '$lib/components/modals/AdminModal.svelte';
	import AdminModalImages from '$lib/components/modals/AdminModalImages.svelte';
	import AdminModalButton from '$lib/components/modals/AdminModalButton.svelte';
	import AdminSearchInput from '$lib/components/AdminSearchInput.svelte';
	export let data;

	let modal = true;
	let filter = '';
</script>

<slot />

<AdminModalButton
	on:click={() => {
		modal = true;
	}}
/>
{#if modal}
	<AdminModal
		title="Imagenes"
		on:close-modal={() => {
			modal = false;
		}}
	>
		<AdminSearchInput slot="header" placeholder="Ingrese texto alternativo.." bind:value={filter} />
		<AdminModalImages images={data.images} {filter} />
	</AdminModal>
{/if}
