<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/pageItems';

    import type { LoadDashboard } from 'types/dashboardLoadTypes';

    import Tabs from 'elements/navigation/tabs.svelte';
    import HeadlineInfoDashboard from 'elements/text/headlineInfoDashboard.svelte';

    export let data: LoadDashboard;
</script>

<Tabs
      entries={Menu.SectionIn(data.roles)}
      entryName={MenuItem.admin.name}
      alignment="navigation-tabs-end"
      background="navigation-tabs-purple"
/>
<HeadlineInfoDashboard headline="Admin">

</HeadlineInfoDashboard>
<slot />
