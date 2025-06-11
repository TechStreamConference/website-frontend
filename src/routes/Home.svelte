<script lang="ts">
    import type {LoadYear} from "@/types/loadTypes";

    import {
        homepage_header_menu_in,
        homepage_header_menu_out,
        default_footer_menu_in,
        default_footer_menu_out
    } from "@/config/menu";

    import  {load_home_page} from "@/fetch/home";

    import Page from "@/lib/default/Page.svelte";
    import Loading from "@/lib/async/Loading.svelte";
    import {onMount} from "svelte";
    import Year from "@/lib/pages/Year.svelte";

    let loading_guard: Loading;
    let data : LoadYear;

    onMount(async () => {
        data = await load_home_page();
        loading_guard.mark_loaded();
    })


</script>
<Page header_menu_logged_in={homepage_header_menu_in} header_menu_logged_out={homepage_header_menu_out}
      footer_menu_logged_in={default_footer_menu_in} footer_menu_logged_out={default_footer_menu_out}>
    <Loading bind:this={loading_guard}>
        <Year {data}/>
    </Loading>
</Page>
