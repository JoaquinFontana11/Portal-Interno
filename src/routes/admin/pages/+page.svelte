<script>
	import { Plus, Table } from 'svelte-hero-icons';
	import AdminForm from '$lib/components/AdminForm.svelte';
	import AdminList from '$lib/components/AdminList.svelte';
	import AdminButton from '$lib/components/AdminButton.svelte';
	// import AdminDrawer from '$lib/components/AdminDrawer.svelte';

	export let data;

	const title = 'Formulario de alta de pagina';
	let loading = false;
	let list = true;

	const components = [
		{
			type: 'text',
			label: 'Titulo de la pagina',
			name: 'title',
			value: '',
			required: true
		},
		{
			type: 'select',
			label: 'Es novedad',
			name: 'isNovelty',
			value: false,
			options: [
				{ name: 'Si', value: true },
				{ name: 'No', value: false }
			]
		},
		{
			type: 'editor',
			label: 'Contenido de la pagina',
			name: 'body',
			value: ''
		},
		{
			type: 'text',
			label: 'Imagen de la novedad',
			name: 'image',
			value: ''
		},
		{
			type: 'text',
			label: 'Banner de la novedad',
			name: 'banner',
			value: ''
		},
		{
			type: 'select',
			label: 'Preguntas frecuentes activas',
			name: 'questionsActive',
			value: false,
			options: [
				{ name: 'Si', value: true },
				{ name: 'No', value: false }
			]
		}
	];

	const pageSubmit = async (e) => {
		if (loading) return;

		loading = true;
		const { data } = e.detail;
		const body = {
			title: data[0].value,
			slug: data[0].value.toLowerCase().replace(/ /g, '-'),
			isNovelty: data[1].value,
			body: data[2].value,
			image: data[3].value,
			banner: data[4].value,
			questionsActive: data[5].value
		};

		try {
			await fetch(`/api/pages`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(body)
			});
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	};

	const deletePage = async (e) => {
		try {
			await fetch(`/api/pages/${e.detail.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});
		} catch (err) {
			console.log(err);
		} finally {
			location.href = location.href;
		}
	};

	const modifyPage = (e) => {
		location.href = `/admin/pages/${e.detail.id}`;
	};
</script>

<AdminButton
	icon={list ? Plus : Table}
	on:click={() => {
		list = !list;
	}}
/>
<main class="ml-56 dark:bg-gray-900 bg-gray-100 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		{#if list}
			<AdminList
				headers={['titulo', 'slug', 'Es novedad', 'Preguntas activas']}
				attributes={['title', 'slug', 'isNovelty', 'questionsActive']}
				data={JSON.parse(data.pages)}
				on:modify-doc={modifyPage}
				on:delete-doc={deletePage}
			/>
		{:else}
			<AdminForm
				{title}
				{components}
				submitMessage="Subir pagina"
				{loading}
				on:custom-submit={pageSubmit}
			/>
		{/if}
	</div>
</main>
