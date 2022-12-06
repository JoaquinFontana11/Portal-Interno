<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let announcement: any;
</script>

<div class="fixed top-0 left-0 w-full h-full bg-black opacity-75 " style="z-index: 100;" />
<div
	id="staticModal"
	data-modal-backdrop="static"
	tabindex="-1"
	aria-hidden="true"
	style="z-index: 101;"
	class="w-1/2 h-1/2 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50   p-4 overflow-x-hidden overflow-y-auto "
>
	<div class="relative w-full h-full max-w-2xl md:h-auto">
		<!-- Modal content -->
		<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
			<!-- Modal header -->
			<div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
					{announcement.title}
				</h3>
				<button
					type="button"
					class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
					data-modal-toggle="staticModal"
                                on:click
                                      >
					<svg
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
				</button>
			</div>
			<!-- Modal body -->
			<div class="p-6 space-y-6">
				<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
					{@html announcement.content}
				</p>
			</div>
                        <div class="p-2">

			<button
				on:click={(e) => {
					dispatch('close-forever', {});
                                }}
                          class="w-full rounded-lg bg-rose-500 text-gray-100 hover:bg-rose-600 p-2"
			>
				No mostrar mas este anuncio
			</button>
                      </div>
		</div>
	</div>
</div>

