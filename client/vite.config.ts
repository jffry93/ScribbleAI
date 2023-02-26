import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';

export default defineConfig({
	plugins: [
		react(),
		copy({
			targets: [{ src: 'robots.txt', dest: 'dist' }],
		}),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks: undefined,
			},
		},
		target: 'es2015',
		outDir: 'dist',
		assetsDir: 'static',
		sourcemap: false,
		minify: true,
	},
	server: {
		// Add the following line to use the HashRouter
		base: '/#/',
	},
});
