<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminCreatePanelDiscussion } from 'types/dashboardLoadTypes';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';

    export let data: LoadAdminCreatePanelDiscussion;
</script>

<Tabs classes="navigation-tabs-dashboard-subpage"
      entries={Menu.admin}
      entryName={MenuItem.adminCreatePanelDiscussion.name} />

<SectionDashboard classes="standard-dashboard-section">

</SectionDashboard>


<style>

</style>
