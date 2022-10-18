import { json } from '@sveltejs/kit';
import { createQuestion, getPage, updatePage } from '$lib/server/db/db';

export async function POST({ request, params }) {
	const data = await request.json();
	const page = await getPage({ _id: params.id });
	const question = await createQuestion(data);

	page.questions.push(question._id);
	await updatePage(params.id, { questions: page.questions });

	return json({
		status: '200',
		question
	});
}
