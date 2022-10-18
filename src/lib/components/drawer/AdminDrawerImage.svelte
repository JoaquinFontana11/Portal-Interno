<script>
	export let src;
	export let alt;
	export let width;
	export let height;
</script>

<a
	href="#"
	class="mt-1 mb-1 relative"
	on:click={() => {
		navigator.clipboard.writeText(src);
	}}
>
	<figure class="relative max-w-sm transition-all cursor-pointer flex justify-center">
		<a href="#">
			<img
				class="max-w-full h-auto rounded-lg filter grayscale hover:grayscale-0 duration-300"
				{src}
				{alt}
			/>
		</a>
		<figcaption
			class="absolute bottom-0 right-1/2 transform translate-x-1/2  text-lg text-white grayscale-0"
		>
			<p>{width} x {height}</p>
		</figcaption>
	</figure>
</a>
