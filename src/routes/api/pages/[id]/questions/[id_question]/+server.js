import { json } from '@sveltejs/kit';
import { deleteQuestion, getPage, updatePage } from '$lib/server/db/db';

export async function DELETE({ params }) {
	const question = await deleteQuestion(params.id_question);
	const page = await getPage({ _id: params.id });

	page.questions = page.questions.filter((idQ) => idQ.toString() != params.id_question);
	await updatePage(params.id, { questions: page.questions });

	return json({
		status: '200',
		question
	});
}
