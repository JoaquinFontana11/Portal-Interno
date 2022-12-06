import type { PageServerLoad } from './$types';
import dbOpeartions from '$lib/server/db/db';
import type { Actions } from './$types';
import dbActions from '$lib/server/actions/actions';

export const load: PageServerLoad = async () => {
	const noveltys = await dbOpeartions.noveltys.getAll();

	const photos = await Promise.all(
		(
			await dbOpeartions.photos.getAll()
		).map(async (photo) => {
			// cargamos comentarios y likes
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

			// cargamos la imagen del usuario que publico la foto
			const userImage = await dbOpeartions.images.getOne({ id: photo.User.photo_id });
			photo.User.Image = userImage;

			return photo;
		})
	);

	let announcements = await dbOpeartions.announcements.getAll();
	const announcementsClosed = await dbOpeartions.announcementClosed.getAll();

	announcements = announcements.map((announcement) => {
		announcement.closed = [];
		announcementsClosed.forEach((closed) => {
		
		console.log(closed)
                  if (closed.announcement_id != announcement.id) return;
			announcement.closed.push(closed.user_id);
		});
                return announcement;
	        
        });
	return {
		noveltys: JSON.stringify(noveltys),
		photos: JSON.stringify(photos),
		announcements: JSON.stringify(announcements)
	};
};

export const actions: Actions = {
	close: dbActions.announcementClosed.create
};
