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
      entryName={MenuItem.user.name}
      alignment="navigation-tabs-end"
      background="navigation-tabs-purple"
/>

<HeadlineInfoDashboard headline="User">
    In diesem Bereich kannst du Änderungen an deinem Profil vornehmen. Klicke dazu unten auf „Profil”. Was du hier einträgst, ist nicht öffentlich sichtbar. Du kannst dich hier auch als Speaker bewerben. Klicke dazu auf „Bewerbung”.
</HeadlineInfoDashboard>

<slot />
