<script>
	import Navbar from '$lib/components/public-app/Navbar.svelte';
	import Footer from '$lib/components/public-app/Footer.svelte';

	export let data;

	const menus = JSON.parse(data.menus);

	const linksFooter = [
		{
			title: 'titulo 1',
			links: [
				{
					name: 'link 1',
					href: '#'
				},
				{
					name: 'link 2',
					href: '#'
				}
			]
		},
		{
			title: 'titulo 2',
			links: [
				{
					name: 'link 1',
					href: '#'
				},
				{
					name: 'link 2',
					href: '#'
				}
			]
		},
		{
			title: 'titulo 3',
			links: [
				{
					name: 'link 1',
					href: '#'
				},
				{
					name: 'link 2',
					href: '#'
				}
			]
		}
	];
</script>

<Navbar {menus} user={JSON.parse(data.user)} />
<main class="h-screen">
	<slot />
</main>
<Footer links={linksFooter} />
