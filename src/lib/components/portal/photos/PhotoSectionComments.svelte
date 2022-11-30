<script lang="ts">
	import { Icon, Trash } from 'svelte-hero-icons';

	export let comments;
	export let user;
	// console.log(comments);

	const deleteComment = async (id) => {
		const data = new FormData();
		data.append('id', id);

		await fetch(`?/deleteComment`, {
			method: 'POST',
			body: data
		});

		location.reload();
	};
</script>

<div class="border border-gray-200 p-5 rounded-md flex flex-col gap-5">
	{#each comments as comment}
		<div class="flex items-center gap-2 ">
			<img src={comment.User.Image.url} class="w-10 h-10 rounded-full" />
			<div class="flex flex-col grow">
				<p class="font-medium text-gray-700">{comment.User.username}</p>
				<p class="font-small text-gray-500">{comment.content}</p>
			</div>
			{#if comment.User.id == user.id}
				<button on:click={() => deleteComment(comment.id)}>
					<Icon
						src={Trash}
						class="w-6 h-6 text-gray-500
				transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white hover:text-gray-300"
					/>
				</button>
			{/if}
		</div>
	{/each}
</div>

<!-- {JSON.stringify(comments)} -->
