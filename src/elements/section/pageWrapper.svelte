<script lang="ts">
    import type {Globals, MenuItem} from 'types/provideTypes.js';

    import Header from 'elements/navigation/header.svelte';
    import Footer from 'elements/navigation/footer.svelte';

    export let headerMenu: MenuItem[];
    export let footerMenu: MenuItem[];
    export let globals: Globals;
</script>

<div class="generic-page-wrapper">
    <Header menu={headerMenu}/>
    <div class="generic-page-content">
        <slot/>
    </div>
    <Footer globals={globals}
            menu={footerMenu}/>
</div>

<style>
    .generic-page-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .generic-page-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
</style>
