<script lang="ts">
    import type {RouteConfig} from "@mateothegreat/svelte5-router";
    import {Router} from "@mateothegreat/svelte5-router";

    import {homepage_item, dashboard_item, imprint_item} from "@/config/MenuItem";

    import Home from "@/routes/Home.svelte";
    import Dashboard from "@/routes/Dashboard.svelte";
    import Imprint from "@/routes/Imprint.svelte";

    const routes: RouteConfig[] = [
        {
            path: homepage_item.path,
            component: Home
        },
        {
            path: dashboard_item.path,
            component: Dashboard,
        },
        {
            path: imprint_item.path,
            component: Imprint,
        },
    ];
</script>

<main>
    <Router {routes}/>
</main>

<style>
</style>
