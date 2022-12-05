<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import AdminModalFile from './AdminModalFile.svelte';
	export let files: any;
	export let filter: string;
</script>

<div class="grid grid-cols-4 gap-1 ">
	{#each files.filter((file) => file.name.includes(filter)) as file (file._id)}
		<div in:fade={{ duration: 300 }} animate:flip={{ duration: 300 }}>
			<AdminModalFile name={file.name} url={file.url} />
		</div>
	{:else}
		<p>No hay ningun archivo cargado</p>
	{/each}
</div>
