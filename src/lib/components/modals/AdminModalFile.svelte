<script>
	import { tweened } from 'svelte/motion';
	import { Document, Table, VideoCamera, PresentationChartBar, Icon } from 'svelte-hero-icons';
	export let name;
	export let url;

	let extension = name.split('.').at(-1);

	// documentos estandar
	// generico: gris
	// file: pdf(rojo), doc,docx(azul)
	// presentacion: naranja
	// table: excel(verde)
	// video: video(azul)

	const iconAndColor = {
		pdf: [Document, 'border-rose-300 hover:border-rose-500'],
		doc: [Document, 'border-blue-300 hover:border-blue-500'],
		docx: [Document, 'border-blue-300 hover:border-blue-500'],
		xlsx: [Table, 'border-green-300 hover:border-green-500'],
		xls: [Table, 'border-green-300 hover:border-green-500'],
		csv: [Table, 'border-green-300 hover:border-green-500'],
		pptx: [PresentationChartBar, 'border-orange-300 hover:border-orange-500'],
		mp4: [VideoCamera, 'border-cyan-300 hover:border-cyan-500']
	};

	const scrollContent = (e) => {
		const paragraph = e.target.querySelector('p');
		if (!paragraph) return;

		paragraph.scroll({
			top: paragraph.offsetHeight,
			behavior: 'smooth'
		});
	};
	const unScrollContent = (e) => {
		const paragraph = e.target.querySelector('p');
		if (!paragraph) return;

		paragraph.scroll({
			top: 0,
			behavior: 'smooth'
		});
	};
</script>

<div
	class={`border-2 ${
		iconAndColor[extension] ? iconAndColor[extension][1] : 'border-gray-300 hover:border-gray-300'
	} rounded-lg`}
	on:mouseover={scrollContent}
	on:focus={scrollContent}
	on:mouseleave={unScrollContent}
>
	<!-- <Icon
		src={iconAndColor[extension] ? iconAndColor[extension][0] : Document}
		class="w-18 h-18 text-gray-800 transition duration-75 dark:text-indigo-700 group-hover:text-gray-900 dark:group-hover:text-white"
	/>
	{extension}
	<p>{name}</p>
	<p>{url}</p> -->

	<a
		href="#"
		class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
	>
		<Icon
			src={iconAndColor[extension] ? iconAndColor[extension][0] : Document}
			class="w-18 h-18 text-gray-800 transition duration-75 dark:text-indigo-700 group-hover:text-gray-900 dark:group-hover:text-white"
		/>
		<p
			class="text-sm text-gray-700 dark:text-gray-400 overflow-x-scroll overflow-y-scroll scrollbar-hide h-8"
		>
			{name}
		</p>
	</a>
</div>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
