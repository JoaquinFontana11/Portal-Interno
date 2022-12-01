<script lang="ts">
	import Section from '$lib/components/portal/Section.svelte';
	import Card from '$lib/components/portal/Card.svelte';
	import { DocumentDuplicate, FolderDownload, Calendar } from 'svelte-hero-icons';
</script>

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
	<div class=" grid grid-cols-2 grid-rows-2 text-lg px-10">
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
	</div>
</Section>
<Section
	title="Zonas de interes"
	config={{
		titleColor: 'text-gray-900',
		backgroundColor: 'bg-gray-100'
	}}
>
	<div class="grid grid-cols-3 gap-10 auto-rows-[20rem]">
		<Card href="/proyects" icon={DocumentDuplicate} title="Proyectos" summary="Proyectos Activos" />
		<Card
			href="/files"
			icon={FolderDownload}
			title="Recursos"
			summary="Archivos que podrian ser de tu interes"
		/>
		<Card
			href="/"
			icon={Calendar}
			title="Calendario"
			summary="Un calendario con todo lo que se viene"
		/>
	</div>
</Section>
