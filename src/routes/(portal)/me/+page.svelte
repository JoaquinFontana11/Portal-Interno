<script lang="ts">
	import type { PageData } from './$types';
	import { Photograph, Icon } from 'svelte-hero-icons';
	import Section from '$lib/components/portal/Section.svelte';

	export let data: PageData;

	const user = JSON.parse(data.user);
	let fileinput, files;

	// transforma una fila en base64
	const fileToBase64 = async (file) => {
		let base64: string = await new Promise((resolve) => {
			let fileReader = new FileReader();
			fileReader.onload = (e) => resolve(fileReader.result as string);
			fileReader.readAsDataURL(file);
		});
		return base64.split(',')[1];
	};

	const onFileSelected = async (e: Event) => {
		const formData = new FormData();
		formData.append('alt', `foto de perfil de ${user.username}`);
		formData.append('image', await fileToBase64(files[0]));
		formData.append('name', files[0].name);
		formData.append('user', user.id);

		await fetch('?/uploadPhoto', {
			method: 'POST',
			body: formData
		});

		location.reload();
	};

	console.log(user);
</script>

<Section
	title="Panel de usuario"
	config={{
		titleColor: 'text-sky-400',
		backgroundColor: 'bg-transparent'
	}}
>
	<div class="bg-neutral-50 rounded-lg shadow-lg p-10 flex flex-col z-10 relative">
		<!-- {data.user} -->
		<div class="flex gap-10">
			<div class="relative">
				<img src={user.Image?.url} alt="Imagen de perfil" class="w-64 h-64 rounded-full" />
				<button
					class="bg-sky-400 p-6 rounded-full hover:bg-sky-500 absolute top-0 right-0 transform translate-x-1/6 -translate-y-1/6"
					on:click={() => {
						fileinput.click();
					}}
				>
					<input
						type="file"
						class="hidden"
						bind:this={fileinput}
						bind:files
						on:change={(e) => onFileSelected(e)}
					/>
					<Icon
						src={Photograph}
						class="w-6 h-6 text-gray-100 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/></button
				>
			</div>
			<div class="border-l border-sky-300 grow pl-3 ">
				<p class="mt-3 text-lg font-bold text-gray-500 md:text-xl dark:text-gray-400">
					Nombre y Apellido
				</p>
				<p class="font-medium text-gray-500 dark:text-gray-400">{user.name} {user.lastname}</p>
				<p class="mt-3 text-lg font-bold text-gray-500 md:text-xl dark:text-gray-400">
					Nombre de usuario
				</p>
				<p class="font-medium text-gray-500 dark:text-gray-400">{user.username}</p>
				<p class="mt-3 text-lg font-bold text-gray-500 md:text-xl dark:text-gray-400">Email</p>
				<p class="font-medium text-gray-500 dark:text-gray-400">{user.email}</p>
				<span class="pt-10">Proximamente estadisticas! 😊</span>
			</div>
		</div>
	</div>
</Section>
