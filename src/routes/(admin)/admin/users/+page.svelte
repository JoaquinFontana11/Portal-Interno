<script lang="ts">
	import type { PageData } from './$types';
	import { Plus, Table } from 'svelte-hero-icons';
	import type { IComponent } from '$lib/types/Components';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import AdminButton from '$lib/components/admin/AdminButton.svelte';
	import { validateInputText, validateEmptyInput } from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';
	import AdminList from '$lib/components/admin/list/AdminList.svelte';
	import AdminListRowUser from '$lib/components/admin/list/rows/AdminListRowUser.svelte';

	export let data: PageData;
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

	const validators = (data: any) => {
		if (
			validateInputText(data[0][1]).status &&
			validateInputText(data[1][1]).status &&
			validateInputText(data[2][1]).status &&
			validateEmptyInput(data[3][1]).status &&
			validateEmptyInput(data[4][1]).status
		) {
			return { status: true, message: 'Se subio correctamente' };
		} else {
			return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
		}
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
		{#if list}
			<AdminList
				headers={['Nombre', 'Nombre de usuario', 'Rol']}
				data={JSON.parse(data.users)}
				caption="Usuarios"
				actions={['delete', 'edit']}
				customRow={AdminListRowUser}
			/>
		{:else}
			<AdminForm
				title="Formulario usuarios"
				{components}
				submitMessage="Agregar usuario"
				{loading}
				{validators}
				action="create"
				on:validation-end={(e) => {
					messageSubmit = e.detail;
					modalConfirm = true;
				}}
			/>
		{/if}
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
