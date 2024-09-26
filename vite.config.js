import { defineConfig } from 'vite';
import path from 'path';
import sass from 'vite-plugin-sass';

export default defineConfig({
    root: '.',
    server: {
        watch: {
            ignored: ['!**/views/**']
        }
    },
    plugins: [
        sass({
            quietDeps: true,
            compilerOptions: {
                style: 'compressed',
            },
        }),
    ],
});