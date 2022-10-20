<script>
	import { Plus, Table } from 'svelte-hero-icons';
	import AdminForm from '$lib/components/AdminForm.svelte';
	import AdminList from '$lib/components/AdminList.svelte';
	import AdminButton from '$lib/components/AdminButton.svelte';
	import AdminListRowUsers from '$lib/components/AdminListRowUsers.svelte';

	export let data;

	let loading = false;
	let list = true;

	const components = [
		{
			type: 'text',
			label: 'Nombre',
			name: 'name',
			value: '',
			required: true
		},
		{
			type: 'text',
			label: 'Apellido',
			name: 'lastName',
			value: '',
			required: true
		},
		{
			type: 'text',
			label: 'Nombre de usuario',
			name: 'username',
			value: '',
			required: true
		},
		{
			type: 'text',
			label: 'Email',
			name: 'email',
			value: '',
			required: true
		},
		{
			type: 'select',
			label: 'Rol',
			name: 'rol',
			value: '',
			required: true,
			options: [
				{ name: 'admin', value: 'admin' },
				{ name: 'user', value: 'user' }
			]
		},
		{
			type: 'text',
			label: 'Cumpleaños (Hacer Date)',
			name: 'birthday',
			value: ''
		}
	];

	const modifyUser = (e) => {
		location.href = `/admin/users/${e.detail.id}`;
	};
	const deleteUser = async (e) => {
		try {
			await fetch(`/api/users/${e.detail.id}`, {
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
	const userSubmit = async (e) => {
		if (loading) return;

		loading = true;
		const { data } = e.detail;
		const body = {
			name: data[0].value,
			lastName: data[1].value,
			username: data[2].value,
			email: data[3].value,
			rol: data[4].value
		};

		try {
			await fetch(`/api/users`, {
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
				headers={['User', 'Rol']}
				data={JSON.parse(data.users)}
				on:modify-doc={modifyUser}
				on:delete-doc={deleteUser}
				caption="Usuarios"
				customRow={AdminListRowUsers}
			/>
		{:else}
			<AdminForm
				title="Formulario de alta de usuario"
				{components}
				submitMessage="Crear usuario"
				{loading}
				on:custom-submit={userSubmit}
			/>
		{/if}
	</div>
</main>
