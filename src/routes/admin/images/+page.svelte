<script>
	import AdminForm from '$lib/components/AdminForm.svelte';
	// import AdminDrawer from '$lib/components/AdminDrawer.svelte';

	const title = 'Formulario de imagen';
	let loading = false;
	const components = [
		{
			type: 'file',
			label: 'Imagen a agregar',
			name: 'image',
			value: '',
			files: []
		},
		{
			type: 'select',
			label: 'Proposito de la imagen',
			name: 'path',
			value: '',
			options: [
				{ name: 'Foto de usuario', value: 'users' },
				{ name: 'Imagen de proposito general', value: 'pages' },
				{ name: 'Foto de galeria', value: 'photos' },
				{ name: 'Imagen de novedades', value: 'noveltys' }
			]
		},
		{
			type: 'text',
			label: 'Texto alternativo',
			name: 'alt',
			value: ''
		}
	];

	const imageSubmit = async (e) => {
		const { data } = e.detail;
		const files = data[0].value;
		console.log(data);

		if (!files[0].type.includes('image'))
			throw new Error('No podes subir algo que no sea una imagen');

		loading = true;

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = async (e) => {
			// uploadImage(e.target.result);

			const imgData = e.target.result.split(',');
			const body = {
				image: imgData[1],
				path: data[1].value,
				alt: data[2].value
			};
			try {
				await fetch(`/api/image`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify(body)
				});
				// location.reload();
			} catch (err) {
				console.log(err);
			} finally {
				loading = false;
			}
		};
	};
</script>

<AdminForm
	{title}
	{components}
	submitMessage="Subir imagen"
	{loading}
	on:custom-submit={imageSubmit}
/>
