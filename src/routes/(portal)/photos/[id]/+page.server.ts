import type { PageServerLoad, Actions } from './$types';
import dbOpeartions from '$lib/server/db/db';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async ({ params }) => {
	const photo = await dbOpeartions.photos.getOne({ id: params.id });
	const comments = await Promise.all(
		(
			await dbOpeartions.comments.getAll({ photo_id: params.id })
		).map(async (comment) => {
			comment.User.Image = await dbOpeartions.images.getOne({ id: comment.User.photo_id });
			return comment;
		})
	);
	const likes = await dbOpeartions.likes.getAll();

	photo.comments = comments;
	photo.likes = likes.filter((like) => like.photo_id == params.id);
	return { photo: JSON.stringify(photo) };
};

export const actions: Actions = {
	createComment: dbActions.comments.create,
	deleteComment: dbActions.comments.delete,
	createLike: dbActions.likes.create,
	deleteLike: dbActions.likes.delete
};
