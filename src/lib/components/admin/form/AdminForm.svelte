<script lang="ts">
	export let action: string;
	export let method: string;

	const callAction = async () => {
		const data = new FormData();
		data.append('test', 'test');

		await fetch(`?/${action}`, {
			method: method,
			body: data
		});
	};
</script>

<form>
	<form {method} action={`?/${action}`}>
		<input name="texto" type="text" />
		<input name="archivo" type="file" />
		<button type="submit">Ingresar</button>
	</form>
</form>

<button on:click={callAction}>Call Action</button>
