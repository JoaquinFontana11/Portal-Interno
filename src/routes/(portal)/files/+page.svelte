<script lang="ts">
	import Section from '$lib/components/portal/Section.svelte';
	import type { PageData } from './$types';
	import { Document, Table, VideoCamera, PresentationChartBar, Icon } from 'svelte-hero-icons';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import AdminSearch from '$lib/components/admin/AdminSearch.svelte';
	import SelectGroups from '$lib/components/portal/files/SelectGroups.svelte';

	export let data: PageData;
	const files = JSON.parse(data.files).map((f) => {
		f.drop = false;
		return f;
	});
	console.log(files);

	let filterFiles = '';
	let filterGroups = '';
	const iconAndColor: any = {
		pdf: [Document, 'border-rose-300 hover:border-rose-500'],
		doc: [Document, 'border-blue-300 hover:border-blue-500'],
		docx: [Document, 'border-blue-300 hover:border-blue-500'],
		xlsx: [Table, 'border-green-300 hover:border-green-500'],
		xls: [Table, 'border-green-300 hover:border-green-500'],
		csv: [Table, 'border-green-300 hover:border-green-500'],
		pptx: [PresentationChartBar, 'border-orange-300 hover:border-orange-500'],
		mp4: [VideoCamera, 'border-cyan-300 hover:border-cyan-500']
	};
</script>

<Section
	title="Recursos"
	config={{
		titleColor: 'text-sky-400',
		backgroundColor: 'bg-transparent'
	}}
>
	<div class="bg-neutral-50 rounded-lg shadow-lg p-10 flex flex-col z-10 relative">
		<div class="w-96 relative self-end flex gap-3">
			<SelectGroups bind:value={filterGroups} />
			<AdminSearch placeholder="Ingrese nombre de archivo..." bind:value={filterFiles} />
		</div>
		<ul class="w-full divide-y divide-gray-200 dark:divide-gray-700">
			{#each files.filter((file) => file.name
						.toLowerCase()
						.includes(filterFiles) && (file.group == filterGroups || filterGroups == '')) as file (file.id)}
				<div in:fade={{ duration: 300 }} animate:flip={{ duration: 300 }}>
					<li class="pb-3 sm:pb-4 pt-3 hover:transition hover:-translate-y-1 duration-75">
						<div class="flex items-center space-x-4">
							<div
								class={`flex-shrink-0 border-2 ${
									iconAndColor[file.name.split('.').at(-1)]
										? iconAndColor[file.name.split('.').at(-1)][1]
										: 'border-gray-300 hover:border-gray-300'
								} rounded-full p-1`}
							>
								<Icon
									src={iconAndColor[file.name.split('.').at(-1)]
										? iconAndColor[file.name.split('.').at(-1)][0]
										: Document}
									class="w-5 h-5 text-gray-800 transition duration-75 dark:text-indigo-700 group-hover:text-gray-900 dark:group-hover:text-white"
								/>
							</div>
							<div class="flex-1 min-w-0">
								<a
									href={file.url}
									class="text-sm font-medium text-gray-900 truncate dark:text-white"
								>
									{file.name}</a
								>
							</div>
							<div class="flex gap-1">
								<p
									class=" items-center text-base font-light text-gray-900 dark:text-white max-w-sm truncate"
								>
									{file.description}
								</p>
								<button
									type="button"
									class={`flex items-center justify-between font-medium text-left text-gray-500 ${
										file.drop ? 'r' : ' border-gray-200'
									} dark:border-gray-700 dark:text-gray-400 duration-75`}
									data-accordion-target="#accordion-flush-body-1"
									aria-expanded="true"
									aria-controls="accordion-flush-body-1"
									on:click={(e) => {
										file.drop = !file.drop;
										console.log('AAAAAAAAAAAAAAAAAAAAA');
									}}
								>
									{#if file.drop}
										<svg
											class="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M20 12H4"
											/></svg
										>
									{:else}
										<svg
											class="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 6v6m0 0v6m0-6h6m-6 0H6"
											/></svg
										>{/if}
								</button>
							</div>
							<!-- <div class="flex gap-3">
								<p
									class="inline-flex items-center text-base font-light text-gray-900 dark:text-white"
								>
									{#if (file.size / 1048576).toFixed(2) > 1}
										{(file.size / 1048576).toFixed(2)} MB
									{:else}
										{(file.size / 1024).toFixed(2)} KB
									{/if}
								</p>
							</div> -->
						</div>
						{#if file.drop}
							<div
								id="accordion-flush-body-1"
								aria-labelledby="accordion-flush-heading-1"
								transition:fly={{
									duration: 200,
									x: 0,
									y: -10,
									opacity: 0.1,
									easing: quintOut
								}}
							>
								<div class="pt-5 px-5 font-light">
									<p class="mb-2 text-gray-500 dark:text-gray-400">
										{file.description}
									</p>
								</div>
							</div>
						{/if}
					</li>
				</div>
			{/each}
		</ul>
	</div>
</Section>
