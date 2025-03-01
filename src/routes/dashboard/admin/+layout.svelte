<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/pageItems';

    import type { LoadDashboard } from 'types/dashboardLoadTypes';

    import Tabs from 'elements/navigation/tabs.svelte';
    import Headline from 'elements/text/headline.svelte';

    export let data: LoadDashboard;
</script>

<Tabs
      entries={Menu.SectionIn(data.roles)}
      entryName={MenuItem.admin.name}
      alignment="navigation-tabs-end"
      background="navigation-tabs-purple"
/>
<div class="dashboard-admin">
    <Headline classes="headline-border">Admin</Headline>
</div>
<slot />

<style>
    .dashboard-admin {
        max-width: 100rem;
        margin:    var(--2x-margin) auto 0;
    }
</style>
