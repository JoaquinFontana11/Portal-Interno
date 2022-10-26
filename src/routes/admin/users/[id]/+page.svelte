<script>
	import AdminForm from '$lib/components/AdminForm.svelte';
	import UserProfileInput from '$lib/components/inputs/UserProfileInput.svelte';

	export let data;
	let loading = false;
	let user = JSON.parse(data.user);

	const components = [
		{
			type: 'text',
			label: 'Nombre',
			name: 'name',
			value: user.name,
			required: true
		},
		{
			type: 'text',
			label: 'Apellido',
			name: 'lastName',
			value: user.lastName,
			required: true
		},
		{
			type: 'text',
			label: 'Nombre de usuario',
			name: 'username',
			value: user.username,
			required: true
		},
		{
			type: 'text',
			label: 'Email',
			name: 'email',
			value: user.email,
			required: true
		},
		{
			type: 'select',
			label: 'Rol',
			name: 'rol',
			value: user.rol,
			required: true,
			options: [
				{ name: 'admin', value: 'admin' },
				{ name: 'user', value: 'user' }
			]
		},
		{
			type: 'date',
			label: 'Cumpleaños (Hacer Date)',
			name: 'birthday',
			value: new Date(user.birthday).toLocaleDateString().split('/').reverse().join('-')
		}
	];

	const userSubmit = async (e) => {
		if (loading) return;

		loading = true;
		const { data } = e.detail;
		const body = {
			name: data[0].value,
			lastName: data[1].value,
			username: data[2].value,
			email: data[3].value,
			rol: data[4].value,
			birthday: new Date(data[5].value).setDate(new Date(data[5].value).getDate() + 1)
		};

		try {
			await fetch(`/api/users/${user._id}`, {
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
		}
	};
</script>

<main class="ml-56 dark:bg-gray-900 bg-gray-100 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<AdminForm
			title="Formulario de datos personales"
			{components}
			submitMessage="Actualizar datos"
			{loading}
			on:custom-submit={userSubmit}
		>
			<UserProfileInput slot="top-slot" src={user.profilePhoto} id={user._id} />
		</AdminForm>
	</div>
</main>
