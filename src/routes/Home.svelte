<script lang="ts">
    import type {Globals} from "@/types/provideTypes";

    import {get_globals} from "@/stores/globals";
    import {has_roles} from "@/stores/roles";

    import {
        homepage_header_menu_in,
        homepage_header_menu_out,
        default_footer_menu_in,
        default_footer_menu_out
    } from "@/config/menu";

    import Page from "@/lib/default/Page.svelte";
    import Loading from "@/lib/async/Loading.svelte";

    let globals: Globals;
    let loading_guard: Loading;

    async function load() {
        globals = await get_globals();
        loading_guard.mark_loaded();
    }
    load().catch();


</script>

<Loading bind:this={loading_guard}>
    <Page header_menu_logged_in={homepage_header_menu_in} header_menu_logged_out={homepage_header_menu_out}
          footer_menu_logged_in={default_footer_menu_in} footer_menu_logged_out={default_footer_menu_out}
          logged_in={has_roles()}
          {globals}>
        <h1>Test</h1>
    </Page>
</Loading>
