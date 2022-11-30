<script lang="ts">
	import { Icon, Heart, Chat, ChatAlt } from 'svelte-hero-icons';
	import PhotoSectionComments from './PhotoSectionComments.svelte';

	export let photo;
	export let user;

	let makeComment = false;
	let value = '';
	let like = photo.likes.some((like) => like.User.id == user.id);

	const publishComment = async () => {
		const data = new FormData();
		data.append('user_id', user.id);
		data.append('photo_id', photo.id);
		data.append('content', value);

		await fetch('?/createComment', {
			method: 'POST',
			body: data
		});

		location.reload();
	};

	const publishLike = async () => {
		const data = new FormData();
		data.append('user_id', user.id);
		data.append('photo_id', photo.id);

		const deleteData = new FormData();
		deleteData.append('id', photo.likes.find((like) => like.User.id == user.id)?.id);

		await fetch(`?/${like ? 'deleteLike' : 'createLike'}`, {
			method: 'POST',
			body: like ? deleteData : data
		});

		location.reload();
	};
</script>

<div
	class="flex flex-col p-10 rounded-lg shadow-lg gap-1 h-full max-h-full bg-white w-2/3 md:w-1/2 ml-auto mr-auto"
>
	<div class="flex items-center gap-2 mb-5">
		<img src="/img/test.png" class="w-12 h-12 rounded-full" />
		<div class="flex flex-col justify-center gap-1">
			<span class="text-xl font-medium leading-none text-gray-800  dark:text-white"
				>nombre de usuario</span
			>
			<h1
				class=" text-5xl font-extrabold tracking-tight leading-none text-gray-900  dark:text-white"
			>
				{photo.title}
			</h1>
		</div>
	</div>
	<div
		class="aspect-square mb-5"
		style="background-image: url('{photo.Image.url}'); background-size: cover"
	/>
	<div class="flex gap-3 mb-5">
		<button on:click={publishLike} class="flex items-center">
			<p class="font-bold text-gray-500">{photo.likes.length}</p>
			<Icon
				src={Heart}
				class={`w-8 h-8 hover:text-rose-500  ${
					like ? 'text-rose-500' : 'text-gray-500'
				} transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}
			/>
		</button>
		<button
			on:click={() => {
				makeComment = !makeComment;
			}}
			class="flex items-center"
		>
			<p class="font-bold text-gray-500">{photo.comments.length}</p>
			<Icon
				src={Chat}
				class="w-8 h-8 hover:text-sky-500 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
			/>
		</button>
	</div>
	{#if makeComment}
		<div class="flex gap-3">
			<input
				type="text"
				placeholder="Escribi tu comentario! 🤓"
				class="focus:outline-none bg-gray-50 border-b border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				bind:value
			/>
			<button
				class="rounded-full bg-sky-500 w-12 h-12 flex items-center justify-center hover:bg-sky-600"
				title="publicar comentario"
				on:click={publishComment}
			>
				<Icon
					src={ChatAlt}
					class="w-6 h-6 text-gray-50 hover:text-gray-100 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
				/>
			</button>
		</div>
	{/if}
	<PhotoSectionComments comments={photo.comments} {user} />
</div>
