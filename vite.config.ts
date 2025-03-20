import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import precss from 'precss'
import stylelint from 'vite-plugin-stylelint'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		dts({ tsconfigPath: './tsconfig.app.json' }),
		cssInjectedByJsPlugin(),
		stylelint({
			fix: true,
			include: ['./src/**/*.css', './src/**/*.pcss'],
			configFile: './.stylelintrc.json',
			emitErrorAsWarning: true,
		}),
		svgr({
			svgrOptions: {
				plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
				svgo: true,
				svgoConfig: {
					floatPrecision: 4,
				},
			},
		}),
	],
	css: {
		postcss: {
			plugins: [precss()],
		},
	},
})
