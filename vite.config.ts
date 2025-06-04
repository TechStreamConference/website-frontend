import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default defineConfig({
    plugins: [svelte()],
    // the server is important so that hot reloading is working.
    server: {
        allowedHosts: ['test_conf_frontend'],
        host: true,
    },
    resolve: {
        alias: {
            "@": path.resolve("./src"),
        },
    },
});
