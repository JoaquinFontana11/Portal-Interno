<script lang="ts">
	import Editor from 'cl-editor/src/Editor.svelte';
	export let label: string;
	export let value: string;
	let html = value;
</script>

<div class="flex justify-center items-center w-full flex-col">
	<p class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left w-full">
		{label}
	</p>
	<Editor
		{value}
		{html}
		on:change={(e) => {
			value = e.detail;
			html = e.detail;
		}}
	/>
</div>
