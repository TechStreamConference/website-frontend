<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadDashboard } from 'types/dashboardLoadTypes';

    import Tabs from 'elements/navigation/tabs.svelte';
    import Headline from 'elements/text/headline.svelte';

    export let data: LoadDashboard;
</script>

<Tabs
      entries={Menu.SectionIn(data.roles)}
      entryName={MenuItem.teamMember.name}
      alignment="navigation-tabs-end"
      background="navigation-tabs-purple"
/>
<div class="dashboard-team-member">
    <Headline classes="headline-border">Team Member</Headline>
</div>
<slot />

<style>
    .dashboard-team-member {
        max-width: 100rem;
        margin:    var(--2x-margin) auto 0;
    }
</style>
