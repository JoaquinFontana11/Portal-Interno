<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	export let data;
	const page = JSON.parse(data.page);
	const questions = page?.questions.map((question) => {
		question.drop = false;
		return question;
	});
</script>

<section class="p-10">
	<h3 class="font-semibold text-cyan-500 text-5xl mb-10">{page.title}</h3>
	<div class="content">
		{@html page.body}
	</div>
</section>
{#if page.questions}
	<section class="p-10">
		<h3 class="font-semibold text-cyan-500 text-3xl mb-10">Preguntas frecuentes</h3>
		<div class="content">
			<div
				id="accordion-flush"
				data-accordion="collapse"
				data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
				data-inactive-classes="text-gray-500 dark:text-gray-400"
			>
				{#each questions as question}
					<h2 id="accordion-flush-heading-1">
						<button
							type="button"
							class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
							data-accordion-target="#accordion-flush-body-1"
							aria-expanded="true"
							aria-controls="accordion-flush-body-1"
							on:click={() => {
								question.drop = !question.drop;
							}}
						>
							<span>{question.question}?</span>
							<svg
								data-accordion-icon
								class="w-6 h-6 shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/></svg
							>
						</button>
					</h2>
					{#if question.drop}
						<div
							id="accordion-flush-body-1"
							aria-labelledby="accordion-flush-heading-1"
							transition:fly={{
								duration: 100,
								x: 0,
								y: -10,
								opacity: 0.1,
								easing: quintOut
							}}
						>
							<div class="py-5 font-light border-b border-gray-200 dark:border-gray-700">
								<p class="mb-2 text-gray-500 dark:text-gray-400">
									{question.answer}
								</p>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</section>
{/if}
