<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';

	export let href: string;
	export let icon: IconSource;
	export let title: string;
	export let summary: string;
</script>

<a
	class="border shadow-md flex flex-col gap-5 relative w-50 h-50 p-5 justify-center bg-white duration-75 hover:-translate-y-1 rounded-md aspect-square"
	{href}
>
	<!-- <img src={novelty.Image.url} /> -->
	<div class="flex flex-col gap-3 justify-center items-center ">
		<div class="border p-3 bg-sky-300 rounded-full">
			<Icon src={icon} class="w-8 h-8 text-gray-900" />
		</div>

		<h1 class=" font-semibold text-2xl h-min">{title}</h1>
		<!-- {#if title == 'Calendario'}
			<div class="flex flex-row gap-1 absolute bottom-5">
				<img src="/img/pala.png" alt="miedo" class="h-6" />
				<img src="/img/pala.png" alt="miedo" class="h-6" />
				<img src="/img/pala.png" alt="miedo" class="h-6" />
			</div>
		{/if} -->
	</div>
</a>
