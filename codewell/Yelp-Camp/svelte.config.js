import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import EnvironmentPlugin from 'vite-plugin-environment';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({}),
		vite: {
			plugins: [EnvironmentPlugin(['MONGO_URI'])]
		}
	},
	preprocess: [preprocess({})]
};

export default config;
