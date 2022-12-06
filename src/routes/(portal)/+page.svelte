<script lang="ts">
	import type { PageData } from './$types';
	import Section from '$lib/components/portal/Section.svelte';
	import PhotoCard from '$lib/components/portal/photos/PhotoCard.svelte';
	import Card from '$lib/components/portal/Card.svelte';
	import { DocumentDuplicate, FolderDownload, Calendar } from 'svelte-hero-icons';
        import Announcement from '$lib/components/portal/Announcement.svelte';
	export let data: PageData;

	const noveltys = JSON.parse(data.noveltys);
	const photos = JSON.parse(data.photos);
	const announcements = JSON.parse(data.announcements);
        const user = JSON.parse(data.user)

        let showAnnouncements = announcements.filter(announcement => !announcement.closed.includes(user.id))
        let currentAnnouncement = 0;
        console.log(showAnnouncements);

        //console.log(JSON.parse(data.user));
        const removeAdd = async (announcementId) => {
          const data = new FormData();
          data.append('user_id', user.id);
          data.append('announcement_id', announcementId);

          await fetch('?/close', {
            method: 'POST',
            body: data
          })
        }
</script>

{#each showAnnouncements as announcement, i}
  {#if i == currentAnnouncement}

  <Announcement {announcement} on:click={() => {currentAnnouncement++}} on:close-forever={() => {removeAdd(announcement.id)}} />
  {/if}
{/each}

<header class="h-[600px] max-w-screen bg-home bg-cover flex items-center justify-center">
	<div class="relative">
		<h1 class="mb-4 text-6xl font-extrabold tracking-tight leading-none text-white ">
			Portal Interno de la DPMA
		</h1>
		<span
			class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 text-rose-600"
			>nuevo!</span
		>
	</div>
</header>
<Section
	title="Nuevo portal Interno!"
	config={{
		titleColor: 'text-gray-900 ',
		backgroundColor: 'bg-gradientWhite'
	}}
>
	<!-- <h1 class="text-gray-800 text-2xl text-center font-semibold mb-6 col-span-2">
		Nuevo Portal Interno
	</h1> -->
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
	<!-- </Section>
<Section
	title="Zonas de interes"
	config={{
		titleColor: 'text-gray-900',
		backgroundColor: 'bg-gray-100'
	}}
> -->
	<div class="flex gap-10 justify-center">
		<Card href="/proyects" icon={DocumentDuplicate} title="Proyectos" />
		<Card href="/files" icon={FolderDownload} title="Recursos" />
		<Card href="/" icon={Calendar} title="Calendario" />
	</div>
</Section>

<Section
	title="Ultimas novedades"
        direction="right"
	overview="Enterarte de lo ultimo de la DPMA"
	config={{
		titleColor: 'text-gray-900',
		backgroundColor: 'bg-gradientSky2'
	}}
>
	<div class="flex flex-col gap-10">
		<div class="flex justify-center gap-10">
			{#each noveltys as novelty}
				<a
					class=" flex flex-col p-10 rounded-lg shadow-lg gap-1 h-full max-h-full bg-white max-w-[640px] uration-75 hover:-translate-y-1"
					href={`/noveltys/${novelty.id}`}
				>
					<img src={novelty.Image.url} class="h-52" />
					<div>
						<span class="font-light text-gray-500">{novelty.date.split('T')[0]}</span>
						<h1 class=" font-semibold text-2xl h-min ">{novelty.Page.title}</h1>
						<div class="flex  w-72">
							<span class="break-words truncate overflow-hidden max-h-52"
								>{@html novelty.Page.body.replace(/<img/g, '<img style="display: none;"')}</span
							>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
	<!--
	<div class="flex justify-center gap-4 w-2/3 ml-auto mr-auto">
		<div class="flex flex-col gap-4 justify-center items-center h-auto grow-0">
			{#if photos[0]}
				<PhotoCard photo={photos[0]} />
			{/if}

			{#if photos[1]}
				<PhotoCard photo={photos[1]} />
			{/if}
		</div>

		<div class="flex flex-col gap-4">
			{#each [0, 1] as i}
				{#if noveltys[i]}
					<a
						class="flex flex-col p-10 rounded-lg shadow-lg gap-1 h-full max-h-full bg-white max-w-[640px] uration-75 hover:-translate-y-1"
						href={`/noveltys/${noveltys[i].id}`}
					>
						<img src={noveltys[i].Image.url} />
						<div>
							<span class="font-light text-gray-500">{noveltys[i].date.split('T')[0]}</span>
							<h1 class=" font-semibold text-2xl h-min ">{noveltys[i].Page.title}</h1>
							<div class="flex  h-full w-72">
								<span class="break-words truncate"
									>{@html noveltys[i].Page.body.replace(
										/<img/g,
										'<img style="display: none;"'
									)}</span
								>
							</div>
						</div>
					</a>
				{/if}
			{/each}
		</div>
              </div>
              -->
</Section>

<Section
	title="Ultimas fotos publicadas!"
	overview="Deja tu comentario"
	direction="left"
	config={{
		titleColor: 'text-gray-900',
		backgroundColor: 'bg-gradientSky'
	}}
>
	<div class="flex justify-center gap-5">
		{#each photos.splice(0, 4) as photo}
			<PhotoCard {photo} />
		{/each}
	</div>
</Section>
