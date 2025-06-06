<script lang="ts">
    import {
        homepage_header_menu_in,
        homepage_header_menu_out,
        default_footer_menu_in,
        default_footer_menu_out
    } from "@/config/menu";

    import Header from "@/lib/navigation/Header.svelte";
    import Footer from "@/lib/navigation/Footer.svelte";
</script>

<Header menu_logged_in={homepage_header_menu_in} menu_logged_out={homepage_header_menu_out}/>
<Footer menu_logged_in={default_footer_menu_in, default_footer_menu_out}/>
