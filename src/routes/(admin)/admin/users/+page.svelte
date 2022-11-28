<script lang="ts">
	import { Plus, Table } from 'svelte-hero-icons';
	import type { IComponent } from '$lib/types/Components';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	// import AdminList from '$lib/components/AdminList.svelte';
	import AdminButton from '$lib/components/admin/AdminButton.svelte';
	// import AdminListRowPhoto from '$lib/components/rows/AdminListRowPhoto.svelte';
	import { validateInputText, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';

	export let data: any;
	let list = true;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };

	const components: IComponent[] = [
		{
			type: 'text',
			label: 'Nombre',
			name: 'name',
			value: ''
		},
		{
			type: 'text',
			label: 'Apellido',
			name: 'lastname',
			value: ''
		},
		{
			type: 'text',
			label: 'Nombre de Usuario',
			name: 'username',
			value: ''
		},
		{
			type: 'text',
			label: 'Correo Electronico',
			name: 'email',
			value: ''
		},
		{
			type: 'select',
			label: 'Rol',
			name: 'roles',
			value: '',
			required: true,
			options: [
				{ value: 'Visitante', name: 'Visitante' },
				{ value: 'Admin', name: 'Admin' }
			]
		}
	];

	const validateInputs = (data: any) => {
		if (
			validateInputText(data[0].value).status &&
			validateInputText(data[1].value).status &&
			validateInputText(data[2].value).status &&
			validateEmptyInput(data[3].value).status &&
			validateEmptyInput(data[4].value).status
		) {
			return { status: true, message: 'Se subio correctamente' };
		} else {
			return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
		}
	};

	const userSubmit = async (e: CustomEvent) => {
		if (loading) return;

		const { data } = e.detail;

		loading = true;

		messageSubmit = validateInputs(data);
		if (!messageSubmit.status) {
			loading = false;
			return (modalConfirm = true);
		}

		const body = {
			name: data[0].value,
			lastname: data[1].value,
			username: data[2].value,
			email: data[3].value,
			role: data[4].value,
			profile_image: null
		};
		modalConfirm = true;
		loading = false;
		console.log(body);
		// try {
		// 	await fetch(`/api/image`, {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Accept: 'application/json'
		// 		},
		// 		body: JSON.stringify(body)
		// 	});
		// 	modalConfirm = true;
		// 	// location.reload();
		// } catch (err) {
		// 	console.log('asdasd', err);
		// } finally {
		// 	loading = false;
		// }
	};
</script>

<AdminButton
	icon={list ? Plus : Table}
	on:click={() => {
		list = !list;
	}}
/>
<main class="ml-56 dark:bg-gray-900 bg-neutral-50 h-screen relative overflow-y-scroll">
	<div class="w-3/4 h-3/4 absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
		<!-- {#if list}
			<AdminList
				headers={['Imagen', 'Texto alternativo']}
				attributes={['url', 'alt']}
				data={JSON.parse(data.images)}
				on:delete-doc={deleteImage}
				caption="Imagenes"
				actions={['delete']}
				customRow={AdminListRowPhoto}
			/>
		{:else} -->
		<AdminForm
			title="Formulario usuarios"
			{components}
			submitMessage="Agregar usuario"
			{loading}
			on:custom-submit={userSubmit}
		/>
		<!-- {/if} -->
	</div>
	<div>
		{#if modalConfirm}
			<AdminModalConfirm
				status={messageSubmit.status}
				message={messageSubmit.message}
				on:close={() => {
					modalConfirm = false;
					messageSubmit.status ? location.reload() : (list = false);
				}}
			/>
		{/if}
	</div>
</main>
