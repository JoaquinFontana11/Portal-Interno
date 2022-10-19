<script>
	import AdminForm from '$lib/components/AdminForm.svelte';

	export let data;

	const submenu = JSON.parse(data.submenu);
	let loading = false;
	console.log(JSON.parse(data.menus).find((menu) => menu._id == submenu.parent).name);
	const components = [
		{
			type: 'text',
			label: 'Nombre del menu',
			name: 'name',
			value: submenu.name,
			required: true
		},
		{
			type: 'select',
			label: 'Slug del menu',
			name: 'slug',
			value: submenu.slug,
			required: true,
			options: JSON.parse(data.slugPages)
		},
		{
			type: 'number',
			label: 'Orden del menu',
			name: 'order',
			value: submenu.order
		},
		{
			type: 'select',
			label: 'Activo',
			name: 'active',
			value: submenu.active,
			options: [
				{ name: 'Si', value: true },
				{ name: 'No', value: false }
			]
		},
		{
			type: 'select',
			label: 'Menu padre',
			name: 'parent',
			value: JSON.parse(data.menus).find((menu) => menu._id == submenu.parent)._id,
			options: JSON.parse(data.menus).map((menu) => {
				return { value: menu._id, name: menu.name };
			})
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
			active: data[3].value,
			parent: data[4].value
		};

		try {
			await fetch(`/api/submenus/${submenu._id}`, {
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
