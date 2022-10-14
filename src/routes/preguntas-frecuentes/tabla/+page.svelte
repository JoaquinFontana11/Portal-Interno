<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                    Modulo 
                </th>
                <th scope="col" class="py-3 px-6">
                    Pregunta
                </th>
                <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                    Respuesta
                </th>
                <th scope="col" class="py-3 px-6">
                    Acciones
                </th>
            </tr>
        </thead>
        <tbody>
            {#each books as book}
				<tr transition:fly="{{ y: 48, duration: 200 }}">
					<td>{ book.title }</td>
					<td>{ book.author }</td>
					<td>{ book.description }</td>
					<td><span style="float: right;">
						<Button color="warning" on:click={editBook({ book })}>Update</Button>
						<Button color="danger" on:click={removeBook({ book })}>Delete</Button>
						</span>
					</td>
				</tr>
				{/each}
        </tbody>
    </table>
</div>