import path from 'path';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www',);

export default defineConfig({
    plugins: [
        react(),
    ],
    root: SRC_DIR,
    publicDir: PUBLIC_DIR,
    base: '',
    build: {
        outDir: BUILD_DIR,
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '@': SRC_DIR,
        },
    },
    server: {
        host: true,
    },
});
