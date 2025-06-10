<script lang="ts">
    import type {Globals} from "@/types/provideTypes";
    import type {Menu} from "@/config/menu";

    import Header from "@/lib/navigation/Header.svelte";
    import Footer from "@/lib/navigation/Footer.svelte";

    export let logged_in: boolean;
    export let globals: Globals;
    export let header_menu_logged_in: Menu;
    export let header_menu_logged_out: Menu;
    export let footer_menu_logged_in: Menu;
    export let footer_menu_logged_out: Menu;

    let header: Header;
    let footer: Footer;

    export function mark_loaded() {
        header.mark_loaded();
        footer.mark_loaded();
    }

</script>

<div class="default-page-wrapper">
    <Header bind:this={header} menu_logged_in={header_menu_logged_in} menu_logged_out={header_menu_logged_out}/>
    <div class="default-page-expander">
        <slot/>
    </div>
    <Footer menu_logged_in={footer_menu_logged_in} menu_logged_out={footer_menu_logged_out}/>
</div>

<style>
    .default-page-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .default-page-expander {
        flex-grow: 1;
    }
</style>
