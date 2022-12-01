<script lang="ts">
	export let novelty;
</script>

<a
	class="border shadow-md  flex flex-col gap-5 justify-between justify-center relative h-full max-w-[340px] p-5 bg-proyectCard duration-75 hover:-translate-y-1"
	href={`/noveltys/${novelty.id}`}
>
	<img src={novelty.Image.url} />
	<div>
		<span class="font-light text-gray-500">{novelty.date.split('T')[0]}</span>
		<h1 class=" font-semibold text-2xl h-min ">{novelty.Page.title}</h1>
		<div class="flex  max-h-60 w-72">
			<span class="break-words truncate">{@html novelty.Page.body}</span>
		</div>
	</div>
</a>
