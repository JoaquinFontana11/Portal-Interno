<script lang="ts">
	import { Sun, Moon, Icon, type IconSource } from 'svelte-hero-icons';
	let src: IconSource = Sun;
	let switchJustify: string = 'justify-end';

	const cambioTema = () => {
		// if NOT set via local storage previously

		if (document.documentElement.classList.contains('dark')) {
			document.documentElement.classList.remove('dark');
			src = Sun;
			switchJustify = 'justify-end';
		} else {
			document.documentElement.classList.add('dark');
			src = Moon;
			switchJustify = 'justify-start';
		}
	};
</script>

<div
	class={` bg-gray-300 dark:bg-gray-500 w-14 rounded-full p-1 flex ${switchJustify} cursor-pointer absolute top-2 right-8 z-10`}
	on:click|preventDefault={cambioTema}
	on:keypress|preventDefault={cambioTema}
>
	<Icon {src} class="w-6 h-6 dark:bg-blue-300 bg-yellow-500 rounded-full" />
</div>
