import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
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
        handlebars({
            partialDirectory: resolve(__dirname, 'partials'),
        })
    ],
});