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
				{ name: 'Foto de usuario', value: 'user' },
				{ name: 'Imagen de proposito general', value: 'pages' },
				{ name: 'Foto de galeria', value: 'photos' },
				{ name: 'Imagen de novedades', value: 'noveltys' }
			]
		}
	];

	const imageSubmit = (e) => {
		console.log(e.detail);
	};
</script>

<AdminForm
	{title}
	{components}
	submitMessage="Subir imagen"
	{loading}
	on:custom-submit={imageSubmit}
/>
