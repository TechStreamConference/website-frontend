<script lang="ts">
    import {homepage_header_menu_in, homepage_header_menu_out} from "@/config/menu";

    import Header from "@/lib/navigation/Header.svelte";
</script>

<Header menu_logged_in={homepage_header_menu_in} menu_logged_out={homepage_header_menu_out}/>
