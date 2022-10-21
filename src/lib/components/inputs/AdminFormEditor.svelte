<script>
	import Editor from 'cl-editor/src/Editor.svelte';
	export let label;
	export let value;
</script>

<div class="flex justify-center items-center w-full flex-col">
	<p class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left w-full">
		{label}
	</p>
	<Editor {value} on:change={(evt) => (value = evt.detail)} />
</div>
