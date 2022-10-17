<script>
	import Editor from 'cl-editor/src/Editor.svelte';
	export let label;

	let html;
</script>

<div class="flex justify-center items-center w-full flex-col">
	<p class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left w-full">
		{label}
	</p>
	<Editor {html} on:change={(evt) => (html = evt.detail)} />
</div>
