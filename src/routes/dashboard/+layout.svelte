<script lang="ts">
    import * as Menu from 'menu/page';

    import type { LoadDashboard } from 'types/dashboardLoadTypes';

    import UnsavedChangesPopup from 'elements/popups/unsavedChangesPopup.svelte';
    import PageWrapper from 'elements/section/pageWrapper.svelte';

    import { onMount } from 'svelte';
    import { unsavedChanges, resetUnsavedChanges } from 'stores/saved';

    export let data: LoadDashboard; // data from database

    onMount(() => {
        resetUnsavedChanges();
        window.addEventListener('beforeunload', (event) => {
            if (unsavedChanges()) {
                event.preventDefault();
            }
        });
    });
</script>

<UnsavedChangesPopup />
<PageWrapper headerMenu={Menu.headerLoggedIn}
             footerMenu={Menu.footerLoggedIn}
             globals={data.globals}>
    <slot />
</PageWrapper>
