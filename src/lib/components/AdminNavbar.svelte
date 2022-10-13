<script>
	import { DesktopComputer, Menu, Photograph, User, Folder, Globe } from 'svelte-hero-icons';
	import AdminNavbarLink from './AdminNavbarLink.svelte';
	import SwitchDarkMode from './SwitchDarkMode.svelte';

	const links = [
		{
			href: '#',
			nombre: 'paginas',
			icon: DesktopComputer
		},
		{
			href: '#',
			nombre: 'menus',
			icon: Menu
		},
		{
			href: '#',
			nombre: 'imagenes',
			icon: Photograph
		},
		{
			href: '#',
			nombre: 'galeria',
			icon: Globe
		},
		{
			href: '#',
			nombre: 'usuarios',
			icon: User
		},
		{
			href: '#',
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
				<a href="#" class="flex justify-start gap-1 items-center mb-2">
					<img class="w-10 h-10 rounded-full" src="/default-thumbnail.jpg" alt="Jese Leos" />
					<span class="ml-3">Mi cuenta</span>
				</a>
			</li>
		</ul>
	</div>
</aside>
<SwitchDarkMode />
