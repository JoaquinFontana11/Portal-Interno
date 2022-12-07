<script lang="ts">
	import type { PageData } from './$types';
	import type { IComponent } from '$lib/types/Components';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import {
		validateInputText,
		validateInputEmail,
		validateEmptyInput
	} from '$lib/components/inputs/validators';
	import AdminModalConfirm from '$lib/components/modals/AdminModalConfirm.svelte';

	export let data: PageData;
	let loading = false;
	let modalConfirm = false;
	let messageSubmit = { status: false, message: '' };

	const user = JSON.parse(data.user);

	const components: IComponent[] = [
		{
			type: 'text',
			label: 'Nombre',
			name: 'name',
			value: user.name
		},
		{
			type: 'text',
			label: 'Apellido',
			name: 'lastname',
			value: user.lastname
		},
		{
			type: 'text',
			label: 'Nombre de Usuario',
			name: 'username',
			value: user.username
		},
		{
			type: 'email',
			label: 'Correo Electronico',
			name: 'email',
			value: user.email
		},
		{
			type: 'select',
			label: 'Rol',
			name: 'role',
			value: user.role,
			required: true,
			options: [
				{ value: 'Visitante', name: 'Visitante' },
				{ value: 'Admin', name: 'Admin' }
			]
		},
		{
			type: 'text',
			label: 'Contraseña',
			name: 'password',
			value: user.password
		}
	];

	const validators = (data: any) => {
		if (
			validateInputText(data[0][1]).status &&
			validateInputText(data[1][1]).status &&
			validateInputText(data[2][1]).status &&
			validateInputEmail(data[3][1]).status &&
			validateEmptyInput(data[3][1]).status &&
			validateEmptyInput(data[4][1]).status
		) {
			return { status: true, message: 'Se subio correctamente' };
		} else {
			return { status: false, message: 'Alguno de los datos ingresados es incorrecto' };
		}
	};

	const extraDataId = (components) => {
		return [{ name: 'id', value: user.id }];
	};
</script>

<div>
	<AdminForm
		title="Formulario usuarios"
		{components}
		submitMessage="Agregar usuario"
		{loading}
		{validators}
		action="update"
		on:validation-end={(e) => {
			messageSubmit = e.detail;
			modalConfirm = true;
		}}
		addExtraData={extraDataId}
	/>
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
