import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import precss from 'precss'
import stylelint from 'vite-plugin-stylelint'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: 'dist/stats.html',
        }),
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
    build: {
        target: 'es2020',
        cssCodeSplit: true,
        sourcemap: false,
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
    },
    
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            '@reown/appkit',
            '@reown/appkit-adapter-wagmi',
            'wagmi',
            'eventemitter3',
        ],
        holdUntilCrawlEnd: true,
        esbuildOptions: {
            target: 'es2020',
        },
    },
})
