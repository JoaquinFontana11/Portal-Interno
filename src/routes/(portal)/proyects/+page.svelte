<script lang="ts">
	import Section from '$lib/components/portal/Section.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Section
	title="Proyectos"
	overview="Nuestros Proyectos"
	config={{
		titleColor: 'text-gray-900',
		backgroundColor: 'bg-slate-50'
	}}
>
	<div class="grid grid-cols-4 gap-10 auto-rows-[26rem]">
		{#each JSON.parse(data.pages) as page}
			<div
				class="border shadow-md w-auto flex flex-wrap justify-center relative h-full bg-proyectCard"
			>
				<h1 class="text-center font-semibold text-2xl h-min mt-6">{page.title}</h1>
				<div class="flex justify-center px-5 max-h-60 w-72">
					<span class="break-words truncate">{@html page.body}</span>
				</div>
				<!-- <div class="w-full h-48 absolute top-0 left-0 -z-1 bg-proyectCard" /> -->
				<!-- bg-[url('/img/footer.png')] -->
				<a
					href={page.slug}
					class=" z-10 inline-flex items-center justify-end font-medium text-sky-600 dark:text-blue-500 hover:underline relative w-full mt-10 hover:gap-2 duration-75 pr-4"
				>
					Ver todo el proyecto
					<svg
						aria-hidden="true"
						class="ml-1 w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</a>
			</div>
		{/each}
	</div>
</Section>
