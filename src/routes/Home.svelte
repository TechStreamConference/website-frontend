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
    import {onMount} from "svelte";

    let loading_guard: Loading;

    onMount(async () => {
        loading_guard.mark_loaded();
    })


</script>
<Page header_menu_logged_in={homepage_header_menu_in} header_menu_logged_out={homepage_header_menu_out}
      footer_menu_logged_in={default_footer_menu_in} footer_menu_logged_out={default_footer_menu_out}>
    <Loading bind:this={loading_guard}>

        <h1>Test</h1>
    </Loading>
</Page>
