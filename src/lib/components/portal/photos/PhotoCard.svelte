<script lang="ts">
	import { Icon, Heart, Chat } from 'svelte-hero-icons';

	export let photo;
	export let big: boolean = false;
</script>

<div class="flex flex-col p-10 rounded-lg shadow-lg gap-1 h-full max-h-full">
	<div class="flex items-center gap-2 mb-5">
		<img src="/img/test.png" class="w-12 h-12 rounded-full" />
		<div class="flex flex-col justify-center gap-1">
			{#if !big}
				<span
					class={`"text-medium font-medium tracking-tight leading-none text-gray-500  dark:text-white"`}
					>nombre de usuario</span
				>
				<h1
					class="text-xl font-extrabold tracking-tight leading-none text-gray-900  dark:text-white"
				>
					{photo.title}
				</h1>
			{:else}
				<span class="text-xl font-medium leading-none text-gray-800  dark:text-white"
					>nombre de usuario</span
				>
			{/if}
		</div>
	</div>
	{#if big}
		<h1
			class="mb-4 text-5xl font-extrabold tracking-tight leading-none text-gray-900  dark:text-white"
		>
			{photo.title}
		</h1>
	{/if}
	<a href={`/photos/${photo.id}`}>
		<div
			class="aspect-square mb-5"
			style="background-image: url('{photo.Image.url}'); background-size: cover"
		/>
	</a>
	<div class="flex gap-3">
		<button>
			<Icon
				src={Heart}
				class={`"${
					big ? 'w-8 h-8 hover:text-rose-500' : 'w-6 h-6  hover:text-rose-500'
				} text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white "`}
			/>
		</button>
		<button>
			<Icon
				src={Chat}
				class={`"${
					big ? 'w-8 h-8  hover:text-sky-500' : 'w-6 h-6  hover:text-sky-500'
				} text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white "`}
			/>
		</button>
	</div>
	{#if big}
		aca se muestran los comentarios
	{/if}
</div>
