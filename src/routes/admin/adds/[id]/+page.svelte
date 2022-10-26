<script>
	import AdminForm from '$lib/components/AdminForm.svelte';

	export let data;

	const ad = JSON.parse(data.ad);
	let loading = false;

	const components = [
		{
			type: 'text',
			label: 'Titulo',
			name: 'title',
			value: ad.title,
			required: true
		},
		{
			type: 'editor',
			label: 'Contenido del anuncio',
			name: 'content',
			value: ad.content,
			required: true
		},
		{
			type: 'date',
			label: 'Fecha de inicio del anuncio',
			name: 'initDate',
			value: new Date(ad.initDate).toLocaleDateString().split('/').reverse().join('-')
		},
		{
			type: 'date',
			label: 'Fecha de fin del anuncio',
			name: 'endDate',
			value: new Date(ad.endDate).toLocaleDateString().split('/').reverse().join('-')
		}
	];

	const addsSubmit = async (e) => {
		if (loading) return;

		loading = true;
		const { data } = e.detail;
		const body = {
			title: data[0].value,
			content: data[1].value,
			initDate: new Date(data[2].value).setDate(new Date(data[2].value).getDate() + 1),
			endDate: new Date(data[3].value).setDate(new Date(data[3].value).getDate() + 1)
		};

		try {
			await fetch(`/api/adds/${ad._id}`, {
				method: 'PATCH',
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
			location.href = '/admin/adds';
		}
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-gray-100 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminForm
			title="Formulario de alta de anuncio"
			{components}
			submitMessage="Subir anuncio"
			{loading}
			on:custom-submit={addsSubmit}
		/>
	</div>
</main>
