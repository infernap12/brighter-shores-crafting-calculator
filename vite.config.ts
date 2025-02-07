import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "brighter-shores-weapon-calculator/",
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	test: {
		globals: true,
	}
})
