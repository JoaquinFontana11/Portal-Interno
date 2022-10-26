<script>
	import { Plus, Table } from 'svelte-hero-icons';
	import AdminForm from '$lib/components/AdminForm.svelte';
	import AdminList from '$lib/components/AdminList.svelte';
	import AdminButton from '$lib/components/AdminButton.svelte';

	export let data;

	let loading = false;
	let list = true;

	const components = [
		{
			type: 'text',
			label: 'Titulo',
			name: 'title',
			value: '',
			required: true
		},
		{
			type: 'editor',
			label: 'Contenido del anuncio',
			name: 'content',
			value: '',
			required: true
		},
		{
			type: 'date',
			label: 'Fecha de inicio del anuncio',
			name: 'initDate',
			value: ''
		},
		{
			type: 'date',
			label: 'Fecha de fin del anuncio',
			name: 'endDate',
			value: ''
		}
	];

	const addsSubmit = async (e) => {
		if (loading) return;

		loading = true;
		const { data } = e.detail;
		const body = {
			title: data[0].value,
			content: data[1].value,
			initDate: new Date(data[2].value),
			endDate: new Date(data[3].value)
		};

		try {
			await fetch(`/api/adds`, {
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

	const deleteAdds = async (e) => {
		try {
			await fetch(`/api/adds/${e.detail.id}`, {
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

	const modifyAdds = (e) => {
		location.href = `/admin/adds/${e.detail.id}`;
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
				headers={['titulo', 'fecha de inicio', 'fecha de fin']}
				attributes={['title', 'initDate', 'endDate']}
				data={JSON.parse(data.ads).map((ad) => {
					(ad.initDate = new Date(ad.initDate).toLocaleDateString().split('/').reverse().join('-')),
						(ad.endDate = new Date(ad.endDate).toLocaleDateString().split('/').reverse().join('-'));
					return ad;
				})}
				on:modify-doc={modifyAdds}
				on:delete-doc={deleteAdds}
				caption="Anuncios"
			/>
		{:else}
			<AdminForm
				title="Formulario de alta de anuncio"
				{components}
				submitMessage="Subir anuncio"
				{loading}
				on:custom-submit={addsSubmit}
			/>
		{/if}
	</div>
</main>
