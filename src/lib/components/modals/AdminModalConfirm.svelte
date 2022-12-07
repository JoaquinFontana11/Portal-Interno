<script lang="ts">
	import { ExclamationCircle, CheckCircle, Icon } from 'svelte-hero-icons';
	import { createEventDispatcher } from 'svelte';

	export let status: boolean;
	export let message: string;
	let buttonClass = status
		? 'text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
		: 'text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center';
	const dispatch = createEventDispatcher();
</script>

<div class="fixed top-0 left-0 w-screen h-full bg-gray-500 opacity-75" />
<div
	id="popup-modal"
	tabindex="-1"
	class=" fixed top-1/2 left-1/2 z-50  h-modal w-96 h-40 transform -translate-x-1/2 -translate-y-1/2"
>
	<div class="relative p-1 h-full md:h-auto">
		<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
			<div class="p-6 text-center">
				{#if status}
					<Icon
						src={CheckCircle}
						class="mx-auto w-1/6 h-1/6 text-green-500 transition duration-75 dark:text-green-400"
					/>
				{:else}
					<Icon
						src={ExclamationCircle}
						class="mx-auto w-1/6 h-1/6 text-red-500 transition duration-75 dark:text-red-400"
					/>
				{/if}
				<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
				<button
					data-modal-toggle="popup-modal"
					type="button"
					class={buttonClass}
					on:click={() => {
						dispatch('close', {});
					}}
				>
					OK
				</button>
			</div>
		</div>
	</div>
</div>
