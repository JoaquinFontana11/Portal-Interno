<script>
	import AdminForm from '$lib/components/AdminForm.svelte';
	import AdminList from '$lib/components/AdminList.svelte';

	export let data;

	const title = 'Formulario de modificacion de pagina';
	const page = JSON.parse(data.page);
	let loading = false;
	let loadingQuestion = false;

	const components = [
		{
			type: 'text',
			label: 'Titulo de la pagina',
			name: 'title',
			value: page.title,
			required: true
		},
		{
			type: 'select',
			label: 'Es novedad',
			name: 'isNovelty',
			value: page.isNovelty,
			options: [
				{ name: 'Si', value: true },
				{ name: 'No', value: false }
			]
		},
		{
			type: 'editor',
			label: 'Contenido de la pagina',
			name: 'body',
			value: page.body
		},
		{
			type: 'text',
			label: 'Imagen de la novedad',
			name: 'image',
			value: page.image
		},
		{
			type: 'text',
			label: 'Banner de la novedad',
			name: 'banner',
			value: page.banner
		},
		{
			type: 'select',
			label: 'Preguntas frecuentes activas',
			name: 'questionsActive',
			value: page.questionsActive,
			options: [
				{ name: 'Si', value: true },
				{ name: 'No', value: false }
			]
		}
	];

	const componentsQuestions = [
		{
			type: 'text',
			label: 'Pregunta',
			name: 'question',
			value: ''
		},
		{
			type: 'text',
			label: 'Respuesta',
			name: 'answer',
			value: ''
		},
		{
			type: 'number',
			label: 'Orden',
			name: 'order',
			value: 0
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
			await fetch(`/api/pages/${page._id}`, {
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
			location.href = '/admin/pages';
		}
	};

	const questionSubmit = async (e) => {
		if (loadingQuestion) return;

		loadingQuestion = true;
		const { data } = e.detail;
		const body = {
			question: data[0].value,
			answer: data[1].value,
			order: data[2].value
		};

		try {
			await fetch(`/api/pages/${page._id}/questions`, {
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
			loadingQuestion = false;
			location.reload();
		}
	};

	const deleteQuestion = async (e) => {
		try {
			await fetch(`/api/pages/${page._id}/questions/${e.detail.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});
		} catch (err) {
			console.log(err);
		} finally {
			location.reload();
		}
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-gray-100 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminForm
			{title}
			{components}
			submitMessage="Modificar pagina"
			{loading}
			on:custom-submit={pageSubmit}
		/>
		<AdminForm
			title="Formulario de preguntas"
			components={componentsQuestions}
			submitMessage="Subir pregunta"
			{loadingQuestion}
			on:custom-submit={questionSubmit}
		>
			<AdminList
				headers={['Pregunta', 'Respuesta']}
				attributes={['question', 'answer']}
				data={page.questions}
				on:delete-doc={deleteQuestion}
				actions={['delete']}
				slot="bottom-slot"
			/>
		</AdminForm>
	</div>
</main>
