import type { Actions } from './$types';
import dbActions from '$lib/server/actions/actions';

export const actions: Actions = {
	uploadPhoto: dbActions.users.uploadPhoto
};
