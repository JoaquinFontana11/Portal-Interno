<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';
	export let title: string;

	const dispatch = createEventDispatcher();
</script>

<div
	id="defaultModal"
	tabindex="-1"
	aria-hidden="true"
	class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  w-full md:inset-0 h-modal md:h-full bg-indigo-100 dark:bg-gray-600"
	transition:fade
>
	<div
		class={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-2xl h-auto overflow-y-hidden z-50`}
		transition:fly={{
			duration: 300,
			x: 0,
			y: -10,
			opacity: 0.1,
			easing: quintOut
		}}
	>
		<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
			<!-- Modal header -->
			<div
				class="flex gap-10 ustify-between items-start p-4 rounded-t border-b dark:border-gray-600"
			>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
					{title}
				</h3>
				<div>
					<slot name="header" />
				</div>
				<button
					type="button"
					class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
					data-modal-toggle="defaultModal"
					on:click={(e) => dispatch('close-modal')}
				>
					<svg
						aria-hidden="true"
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
					<span class="sr-only">Close modal</span>
				</button>
			</div>
			<!-- Modal body -->
			<div class="p-6 space-y-6 overflow-y-scroll h-96 ">
				<slot />
			</div>
		</div>
	</div>
</div>
