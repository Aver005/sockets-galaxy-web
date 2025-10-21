import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from "vite-plugin-singlefile"

/*
    Config url
    https://vite.dev/config/
*/

export default defineConfig(
{
    plugins: [preact(), tailwindcss(), viteSingleFile()],
    base: '/',
    resolve:
    {
        alias:
        {
            '@': '/src',
            '$': '/public',
            '#': '/src/shared',
        },
    },
})
