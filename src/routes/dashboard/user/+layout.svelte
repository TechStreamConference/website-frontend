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
      entryName={MenuItem.user.name}
      alignment="navigation-tabs-end"
      background="navigation-tabs-purple"
/>
<div class="dashboard-user">
    <Headline classes="headline-border">User</Headline>
</div>
<slot />

<style>
    .dashboard-user {
        max-width: 100rem;
        margin:    var(--2x-margin) auto 0;
    }
</style>
