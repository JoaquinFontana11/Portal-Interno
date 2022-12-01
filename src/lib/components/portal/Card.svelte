<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';

	export let href: string;
	export let icon: IconSource;
	export let title: string;
	export let summary: string;
</script>

<a
	class="border shadow-md flex flex-col gap-5 justify-between justify-center relative h-full max-w-[340px] p-5 bg-homeCard duration-75 hover:-translate-y-1 rounded-md"
	{href}
>
	<!-- <img src={novelty.Image.url} /> -->
	<div class="flex flex-col gap-3 justify-center items-center">
		<div class="border p-3 bg-sky-300 rounded-full">
			<Icon src={icon} class="w-8 h-8 text-gray-900" />
		</div>

		<h1 class=" font-semibold text-2xl h-min mb-12">{title}</h1>
		<span class="text-center break-words">{summary}</span>
		{#if title == 'Calendario'}
			<div class="flex flex-row gap-1">
				<img src="/img/pala.png" alt="miedo" class="h-1/3" />
				<img src="/img/pala.png" alt="miedo" class="h-1/3" />
				<img src="/img/pala.png" alt="miedo" class="h-1/3" />
			</div>
		{/if}
	</div>
</a>
