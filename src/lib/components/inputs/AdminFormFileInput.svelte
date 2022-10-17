<script>
	export let files;
	export let label;

	let dragEnter = false;
	let filename = '';

	const dropHandler = (e) => {
		if (e.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			[...e.dataTransfer.items].forEach((item, i) => {
				// If dropped items aren't files, reject them
				if (item.kind === 'file') {
					const file = item.getAsFile();
					console.log(file);
					filename = file.name;
				}
			});
		} else {
			// Use DataTransfer interface to access the file(s)
			[...e.dataTransfer.files].forEach((file, i) => {
				filename = file.name;
			});
		}
		dragEnter = false;
	};

	const uploadHandler = (e) => {
		[...files].forEach((file, i) => {
			filename = file.name;
		});
	};
</script>

<div class="flex justify-center items-center w-full flex-col">
	<p class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left w-full">
		{label}
	</p>
	<label
		for="dropzone-file"
		class={`flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 ${
			dragEnter ? 'border-indigo-600' : 'border-gray-300'
		} border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
		on:drop|preventDefault|stopPropagation={dropHandler}
		on:dragenter|preventDefault|stopPropagation={() => (dragEnter = true)}
		on:dragover|preventDefault|stopPropagation={() => (dragEnter = true)}
		on:dragleave|preventDefault|stopPropagation={() => (dragEnter = false)}
	>
		<div class="flex flex-col justify-center items-center pt-5 pb-6">
			<svg
				aria-hidden="true"
				class="mb-3 w-10 h-10 text-gray-400"
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
			<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
				<span class="font-semibold">Click para subir</span> o arrastre y suelte una imagen
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-400">PNG o JPG</p>
			<p class="text-xs text-gray-500 dark:text-gray-400">{filename}</p>
		</div>
		<input
			id="dropzone-file"
			type="file"
			class="hidden"
			bind:files
			on:change|preventDefault={uploadHandler}
		/>
	</label>
</div>
