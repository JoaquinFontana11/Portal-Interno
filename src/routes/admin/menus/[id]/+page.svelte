<script>
	import AdminForm from '$lib/components/AdminForm.svelte';

	export let data;

	const menu = JSON.parse(data.menu);
	let loading = false;

	const components = [
		{
			type: 'text',
			label: 'Nombre del menu',
			name: 'name',
			value: menu.name,
			required: true
		},
		{
			type: 'select',
			label: 'Slug del menu',
			name: 'slug',
			value: menu.slug,
			options: JSON.parse(data.slugPages)
		},
		{
			type: 'number',
			label: 'Orden del menu',
			name: 'order',
			value: menu.order
		},
		{
			type: 'select',
			label: 'Activo',
			name: 'active',
			value: menu.active,
			options: [
				{ name: 'Si', value: true },
				{ name: 'No', value: false }
			]
		}
	];

	const menuSubmit = async (e) => {
		if (loading) return;

		loading = true;
		const { data } = e.detail;
		const body = {
			name: data[0].value,
			slug: data[1].value,
			order: data[2].value,
			active: data[3].value
		};

		try {
			await fetch(`/api/menus/${menu._id}`, {
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
			location.href = '/admin/menus';
		}
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-gray-100 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminForm
			title="Formulario de modificacion de menus"
			{components}
			submitMessage="Modificar menu"
			{loading}
			on:custom-submit={menuSubmit}
		/>
	</div>
</main>
