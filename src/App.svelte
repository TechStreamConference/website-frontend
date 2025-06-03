<script lang="ts">
    import type {RouteConfig} from "@mateothegreat/svelte5-router";
    import {Router} from "@mateothegreat/svelte5-router";

    import * as Item from './config/MenuItem'

    import Home from "./routes/Home.svelte";
    import Dashboard from "./routes/Dashboard.svelte";
    import Imprint from "./routes/Imprint.svelte";

    const routes: RouteConfig[] = [
        {
            path: Item.homepage.path,
            component: Home
        },
        {
            path: Item.dashboard.path,
            component: Dashboard,
        },
        {
            path: Item.imprint.path,
            component: Imprint,
        },
    ];
</script>

<main>
    <Router {routes}/>
</main>

<style>
</style>
