<script>
	import { DesktopComputer, Menu, Photograph, User, Folder, Globe } from 'svelte-hero-icons';
	import AdminNavbarLink from './AdminNavbarLink.svelte';
	import SwitchDarkMode from './SwitchDarkMode.svelte';

	export let user;

	const links = [
		{
			href: '/admin/pages',
			nombre: 'paginas',
			icon: DesktopComputer
		},
		{
			href: '/admin/menus',
			nombre: 'menus',
			icon: Menu
		},
		{
			href: '/admin/images',
			nombre: 'imagenes',
			icon: Photograph
		},
		{
			href: '/admin/photos',
			nombre: 'galeria',
			icon: Globe
		},
		{
			href: '/admin/users',
			nombre: 'usuarios',
			icon: User
		},
		{
			href: '/admin/files',
			nombre: 'archivos',
			icon: Folder
		}
	];
</script>

<aside class="h-screen w-56 fixed bg-gray-50 dark:bg-gray-800 shadow-md z-10" aria-label="Sidebar">
	<div class=" overflow-y-auto py-4 px-3 h-full">
		<ul class="space-y-2 h-full">
			{#each links as link}
				<AdminNavbarLink href={link.href} nombre={link.nombre} icon={link.icon} />
			{/each}
			<li class="absolute bottom-1">
				<a
					href="/admin/users/me"
					class="flex justify-start gap-1 items-center mb-2 text-gray-900 rounded-lg dark:text-white "
				>
					<img
						class="w-10 h-10 rounded-full"
						src={user.profilePhoto == '#' ? '/img/test.png' : user.profilePhoto}
						alt="Foto de perfil"
					/>
					<span class="ml-3">Mi cuenta</span>
				</a>
			</li>
		</ul>
	</div>
</aside>
<SwitchDarkMode />
