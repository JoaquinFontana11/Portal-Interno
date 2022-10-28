<script>
	import AdminForm from '$lib/components/AdminForm.svelte';

	const title = 'Login';
	let loading = false;
	const components = [
		{
			type: 'text',
			label: 'Nombre de usuario',
			name: 'username',
			value: ''
		},
		{
			type: 'password',
			label: 'Contraseña',
			name: 'password',
			value: ''
		}
	];

	const login = async (e) => {
		loading = true;
		const data = e.detail.data;

		try {
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					username: data[0].value,
					password: data[1].value
				})
			});
			location.href = '/portal/home';
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	};
</script>

<div
	class="w-96 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 overflow-hidden rounded-xl"
>
	<AdminForm
		{title}
		{components}
		submitMessage="Iniciar sesion"
		{loading}
		on:custom-submit={login}
	/>
</div>
