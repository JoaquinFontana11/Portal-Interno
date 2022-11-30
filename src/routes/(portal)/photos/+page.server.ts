import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';

export const load: PageServerLoad = async () => {
	const photos = await Promise.all(
		(
			await dbOpeartions.photos.getAll()
		).map(async (photo) => {
			const comments = await Promise.all(
				(
					await dbOpeartions.comments.getAll({ photo_id: photo.id })
				).map(async (comment) => {
					comment.User.Image = await dbOpeartions.images.getOne({ id: comment.User.photo_id });
					return comment;
				})
			);
			const likes = await dbOpeartions.likes.getAll();

			photo.comments = comments;
			photo.likes = likes.filter((like) => like.photo_id == photo.id);
			return photo;
		})
	);

	return { photos: JSON.stringify(photos) };
};
