<script>
	import AdminMessage from '../AdminMessage.svelte';

	export let src;
	export let alt;

	let showMessage = false;
	let loadImage = false;

	const handlerClick = async (e) => {
		// agregamos esto pq el clipboard solo funciona en paginas HTTPS
		if (navigator.clipboard) {
			navigator.clipboard.writeText(src);
		} else {
			let textArea = document.createElement('textarea');
			textArea.value = src;
			textArea.classList.add('fuera');
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			document.execCommand('copy');
			textArea.remove();
		}

		showMessage = true;
		setTimeout(() => {
			showMessage = false;
		}, 2000);
	};
</script>

{#if loadImage}
	<div class="flex justify-center items-center w-auto h-auto bg-gray-300 rounded  dark:bg-gray-700">
		<svg
			class="w-12 h-12 text-gray-200"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			fill="currentColor"
			viewBox="0 0 640 512"
			><path
				d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
			/></svg
		>
	</div>
{:else}
	{#if showMessage}
		<AdminMessage type="success" message="La imagen se copio con exito!" />
	{/if}
	<a href="#" class={`mt-1 mb-1 relative ${loadImage ? 'hidden' : ''}`} on:click={handlerClick}>
		<figure
			class="relative max-w-sm transition-all cursor-pointer flex justify-center"
			on:load={() => (loadImage = false)}
		>
			<a href="#">
				<img
					class={`max-w-full h-auto border-2 hover:border-green-600 duration-300 rounded-lg `}
					{src}
					{alt}
					on:load={() => {
						loadImage = false;
						console.log('load');
					}}
				/>
			</a>
		</figure>
	</a>
	<div
		class={`flex justify-center items-center w-auto h-auto bg-gray-300 rounded  dark:bg-gray-700 ${
			loadImage ? '' : 'hidden'
		}`}
	>
		<svg
			class="w-12 h-12 text-gray-200"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			fill="currentColor"
			viewBox="0 0 640 512"
			><path
				d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
			/></svg
		>
	</div>
{/if}

<style>
	.fuera {
		position: fixed;
		left: -99999px;
		top: -99999px;
	}
</style>
