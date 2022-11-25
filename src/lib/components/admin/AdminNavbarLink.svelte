<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';

	export let href: string;
	export let nombre: string;
	export let icon: IconSource;
</script>

<li>
	<a
		{href}
		class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
	>
		<Icon
			src={icon}
			class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
		/>
		<span class="ml-3">{nombre}</span>
	</a>
</li>
