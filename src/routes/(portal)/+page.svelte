<script lang="ts">
	import type { PageData } from './$types';
	import Section from '$lib/components/portal/Section.svelte';
	import PhotoCard from '$lib/components/portal/photos/PhotoCard.svelte';
	import Card from '$lib/components/portal/Card.svelte';
	import { DocumentDuplicate, FolderDownload, Calendar } from 'svelte-hero-icons';

	export let data: PageData;

	const noveltys = JSON.parse(data.noveltys);
	const photos = JSON.parse(data.photos);
</script>

<header class="h-[600px] max-w-screen bg-home bg-cover flex items-center justify-center">
	<div class="relative">
		<h1
			class="mb-4 text-6xl font-extrabold tracking-tight leading-none text-sky-500 dark:text-white"
		>
			Portal Interno de la DPMA
		</h1>
		<span
			class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 text-rose-600"
			>nuevo!</span
		>
	</div>
</header>
<Section
	title="Introduccion"
	config={{
		titleColor: 'text-sky-400 ',
		backgroundColor: 'bg-white'
	}}
>
	<h1 class="text-gray-800 text-2xl text-center font-semibold mb-6 col-span-2">
		Nuevo Portal Interno
	</h1>
	<div class="mb-10">
		<span class="text-center block text-gray-700">Bienvenido al nuevo portal Interno!!</span>
		<span class="text-center block  text-gray-700"
			>En este lugar encotraras informacion y archivos que pueden ser de tu interes</span
		>
	</div>
	<!-- <div class=" grid grid-cols-2 grid-rows-2 text-lg px-10">
		<div class="flex justify-center">
			<img src="/img/teamWork.jpg" alt="team work" class="h-2/3 w-1/2" />
		</div>

		<span class=" block text-gray-700"
			>Podes encontrar informacion sobre la DPMA, sobre tus Licencias y Permisos, tambien sobre como
			esta conformado cada equipo dentro de la DPMA</span
		>
		<div>
			<span class="block text-gray-700"
				>Podras Acceder a Recursos y Archivos que pueden serte muy utiles, ver las ultimas
				Novedades!!
			</span>
			<span class="block text-gray-700">Y muchas cosas mas que dejamos que vos mismo descubras</span
			>
		</div>
		<div class="flex justify-center">
			<img src="/img/files.jpg" alt="team work" class="h-2/3 w-1/2" />
		</div>
	</div> -->
</Section>
<Section
	title="Zonas de interes"
	config={{
		titleColor: 'text-gray-900',
		backgroundColor: 'bg-gray-100'
	}}
>
	<div class="grid grid-cols-3 gap-10 auto-rows-[12rem] justify-items-center">
		<Card href="/proyects" icon={DocumentDuplicate} title="Proyectos" />
		<Card href="/files" icon={FolderDownload} title="Recursos" />
		<Card href="/" icon={Calendar} title="Calendario" />
	</div>
</Section>

<Section
	title="Fotos y Novedades!"
	overview="Enterarte de lo ultimo de la DPMA"
	config={{
		titleColor: 'text-gray-900',
		backgroundColor: 'bg-[url("/img/fondo.svg")]'
	}}
>
	<div class="flex justify-center gap-2 w-2/3 ml-auto mr-auto">
		<div class="flex flex-col gap-2 justify-center items-center h-auto grow-0">
			{#if photos[0]}
				<PhotoCard photo={photos[0]} />
			{/if}

			{#if photos[1]}
				<PhotoCard photo={photos[1]} />
			{/if}
		</div>

		<div class="flex flex-col gap-2">
			{#each [0, 1] as i}
				{#if noveltys[i]}
					<a
						class="flex flex-col p-10 rounded-lg shadow-lg gap-1 h-full max-h-full bg-white max-w-[640px]"
						href={`/noveltys/${noveltys[i].id}`}
					>
						<img src={noveltys[i].Image.url} />
						<div>
							<span class="font-light text-gray-500">{noveltys[i].date.split('T')[0]}</span>
							<h1 class=" font-semibold text-2xl h-min ">{noveltys[i].Page.title}</h1>
							<div class="flex  h-full w-72">
								<span class="break-words truncate">{@html noveltys[i].Page.body}</span>
							</div>
						</div>
					</a>
				{/if}
			{/each}
		</div>
	</div>
</Section>
