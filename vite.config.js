import { sveltekit } from '@sveltejs/kit/vite';
import { searchForWorkspaceRoot } from 'vite';

const config = {
	plugins: [sveltekit()],
	test: {
		globals: true,
		environment: 'jsdom',
		cache: false
	},
	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()), '/static']
		}
	}
};

export default config;
