<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let menus: any;
	let responsiveNavDrop = true;
	let dropUserMenu = false;

	const closeSubmenus = (e: Event) => {
		if (e.clientY < 100) return;
		menus = menus.map((menu) => {
			menu.drop = false;
			return menu;
		});
		dropUserMenu = false;
	};
</script>

<svelte:window on:click={closeSubmenus} />
<nav
	class={`bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 shadow-xl z-50 hover:shadow-3x relative w-screen`}
	style="z-index: 9999"
>
	<div class="container flex flex-wrap justify-between items-center min-w-full">
		<a href="/" class="flex items-center">
			<!-- <img src="/img/PBA.png" class="mr-3 h-20" alt="PBA logo" /> -->
			Nuevo Portal Interno
		</a>
		<button
			data-collapse-toggle="navbar-default"
			type="button"
			class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			aria-controls="navbar-default"
			aria-expanded="false"
			on:click={() => (responsiveNavDrop = !responsiveNavDrop)}
		>
			<span class="sr-only">Open main menu</span>
			<svg
				class="w-6 h-6"
				aria-hidden="true"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
					clip-rule="evenodd"
				/></svg
			>
		</button>
		{#if responsiveNavDrop != null && responsiveNavDrop}
			<div
				class=" w-full md:block md:w-auto"
				id="navbar-default"
				transition:fly={{
					duration: 300,
					x: 0,
					y: -10,
					opacity: 0.1,
					easing: quintOut
				}}
			>
				<ul
					class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
				>
					{#each menus as menu}
						{#if menu.submenus}
							<li class="relative">
								<button
									id="mega-menu-full-dropdown-button"
									class="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-600 md:p-0 dark:text-gray-400 md:dark:hover:text-sky-500 dark:hover:bg-gray-700 dark:hover:text-sky-500 md:dark:hover:bg-transparent dark:border-gray-700"
									on:click={() => {
										menus
											.filter((otherMenu) => otherMenu.name != menu.name)
											.forEach((otherMenu) => (otherMenu.drop = false));
										menu.drop = !menu.drop;
									}}
									>{menu.name}<svg
										class="ml-1 w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
										><path
											fill-rule="evenodd"
											d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
											clip-rule="evenodd"
										/></svg
									></button
								>
								{#if menu.drop}
									<div
										id="mega-menu-full-dropdown"
										class="mt-1  bg-white border-gray-200 shadow-xl border dark:bg-gray-800 dark:border-gray-600 absolute top-12 left-1/2 transform -translate-x-1/2"
										style="z-index: 9999;"
										transition:fly={{
											duration: 300,
											x: 0,
											y: -10,
											opacity: 0.1,
											easing: quintOut
										}}
									>
										{#if menu.submenus.length <= 4}
											<div
												class=" py-5 px-4 mx-auto max-w-screen-xl text-gray-900 dark:text-white  md:px-6 w-72 shadow-xl"
											>
												<ul>
													{#each menu.submenus as submenu}
														<li>
															<a
																href={submenu.Page.slug}
																class="block p-3 rounded-lg hover:bg-gray-200 text-gray-700  hover:text-sky-500 dark:hover:bg-gray-700"
															>
																<p class="font-semibold text-sm ">{submenu.name}</p>
																<span class="text-sm font-light text-gray-500 dark:text-gray-400"
																	>{submenu.description}</span
																>
															</a>
														</li>
													{/each}
												</ul>
											</div>
										{:else}
											<div
												class=" grid py-5 px-4 mx-auto max-w-screen-xl text-gray-900 dark:text-white md:px-6 sm:grid-cols-2 md:w-128 w-96"
											>
												<ul>
													{#each menu.submenus.filter((submenu, i) => i % 2 == 0) as submenu}
														<li>
															<a
																href={submenu.slug}
																class="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
															>
																<p class="font-semibold text-sm text-gray-700">{submenu.name}</p>
																<span class="text-sm font-light text-gray-500 dark:text-gray-400"
																	>{submenu.description}</span
																>
															</a>
														</li>
													{/each}
												</ul>
												<ul>
													{#each menu.submenus.filter((submenu, i) => i % 2 != 0) as submenu}
														<li>
															<a
																href={submenu.href}
																class="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
															>
																<p class="font-semibold text-sm text-gray-700">{submenu.name}</p>
																<span class="text-sm font-light text-gray-500 dark:text-gray-400"
																	>{submenu.description}</span
																>
															</a>
														</li>
													{/each}
												</ul>
											</div>
										{/if}
									</div>
								{/if}
							</li>
						{:else}
							<li>
								<a
									href={menu.slug}
									class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>{menu.name}</a
								>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		{/if}
		<div class="relative">
			<button
				type="button"
				class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
				id="user-menu-button"
				aria-expanded="false"
				data-dropdown-toggle="user-dropdown"
				data-dropdown-placement="bottom"
				on:click={() => {
					dropUserMenu = !dropUserMenu;
				}}
			>
				<img
					class="w-8 h-8 rounded-full"
					src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
				/>
			</button>
			{#if dropUserMenu}
				<div
					class="z-50 absolute my-4 right-1/3 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
					id="user-dropdown"
					transition:fly={{
						duration: 300,
						x: 0,
						y: -10,
						opacity: 0.1,
						easing: quintOut
					}}
				>
					<div class="px-4 py-3">
						<span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
						<span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400"
							>name@flowbite.com</span
						>
					</div>
					<ul class="py-1" aria-labelledby="user-menu-button">
						<li>
							<a
								href="#"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>Dashboard</a
							>
						</li>
						<li>
							<a
								href="#"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>Settings</a
							>
						</li>
						<li>
							<a
								href="#"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>Earnings</a
							>
						</li>
						<li>
							<a
								href="#"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>Sign out</a
							>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</nav>
