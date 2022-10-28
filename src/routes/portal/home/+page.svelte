<!-- <h1 class="text-3xl font-bold underline">Hello world!</h1> -->
<script>
	import AdminModal from '$lib/components/modals/AdminModal.svelte';

	let modal = true;
</script>

{#if modal}
	<AdminModal
		title="Titulo"
		on:close-modal={() => {
			modal = false;
		}}
	>
		<p>hola</p>
	</AdminModal>
{/if}
