<script>
	export let links;
</script>

<footer class="p-4  bg-gray-200 dark:bg-gray-400 relative max-w-screen">
	<div class="md:flex md:justify-between">
		<div class="mb-6 md:mb-0">
			<a href="/home" class="flex items-center justify-center">
				<img src="/img/PBA.png" class="mr-3 h-32" alt="FlowBite Logo" />
			</a>
		</div>
		<div class={`grid grid-cols-1 text-center gap-8 sm:text-left sm:gap-6 sm:grid-cols-3`}>
			{#each links as linkList}
				<div class="">
					<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
						{linkList.title}
					</h2>
					<ul class="text-gray-600 dark:text-gray-400">
						{#each linkList.links as link}
							<li class="mb-4">
								<a href={link.href} class="hover:underline">{link.name}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
	<!-- <hr class="my-6 border-gray-400 sm:mx-auto dark:border-gray-700 lg:my-8" /> -->
</footer>
