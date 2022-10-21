<script>
	import Spinner from '$lib/components/Spinner.svelte';

	export let src;
	export let id;

	let loading = false;
	let filename = '';
	let files;

	const uploadProfilePhoto = (e) => {
		if (loading) return;

		if (!files[0].type.includes('image'))
			throw new Error('No podes subir algo que no sea una imagen');

		loading = true;

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = async (e) => {
			// uploadImage(e.target.result);

			const imgData = e.target.result.split(',');
			const body = {
				image: imgData[1],
				path: 'users',
				alt: 'Foto de perfil del usuario'
			};
			try {
				const res = await fetch(`/api/image`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify(body)
				});

				const json = await res.json();

				await fetch(`/api/users/${id}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({ profilePhoto: json.newImage.url })
				});

				location.reload();
			} catch (err) {
				console.log(err);
			} finally {
				loading = false;
			}
		};
	};

	const uploadHandler = (e) => {
		[...files].forEach((file, i) => {
			filename = file.name;
		});
	};
</script>

<div>
	<img
		src={src == '#' ? '/img/test.png' : src}
		alt="Foto de usuario"
		class="w-32 h-32 rounded-full absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2"
	/>
	<div class="flex gap-1">
		<div class="flex justify-center items-center w-1/2 flex-col">
			<label
				for="dropzone-file"
				class={`flex flex-col justify-center items-center w-full h-12 bg-gray-50 rounded-lg border-2 border-indigo-600 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
				on:change|preventDefault|stopPropagation={uploadHandler}
			>
				<div class="flex justify-center items-center pt-5 pb-6">
					<svg
						aria-hidden="true"
						class=" w-5 h-5 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
						/></svg
					>
					<p class="text-xs text-gray-500 dark:text-gray-400">
						{filename ? filename : 'click para subir una imagen'}
					</p>
				</div>
				<input id="dropzone-file" type="file" class="hidden" bind:files />
			</label>
		</div>
		<button
			class="w-1/2 m-0 focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 flex justify-center items-center"
			on:click|preventDefault={uploadProfilePhoto}
		>
			{#if loading}
				<Spinner />
			{:else}
				Actualizar imagen
			{/if}</button
		>
	</div>
</div>
