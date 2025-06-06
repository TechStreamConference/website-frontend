<script lang="ts">
    import type {RouteConfig} from "@mateothegreat/svelte5-router";
    import {Router} from "@mateothegreat/svelte5-router";

    import {homepage_item, dashboard_item, imprint_item} from "@/config/MenuItem";
    import {dashboard_auth} from "@/hooks/auth";

    import Home from "@/routes/Home.svelte";
    import Dashboard from "@/routes/Dashboard.svelte";
    import Imprint from "@/routes/Imprint.svelte";

    import ThemeToggle from "@/lib/interact/ThemeToggle.svelte";

    const routes: RouteConfig[] = [
        {
            path: homepage_item.path,
            component: Home
        },
        {
            path: dashboard_item.path,
            hooks: {pre: dashboard_auth},
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

    <ThemeToggle/>
</main>

<style>
</style>
