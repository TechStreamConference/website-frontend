<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import List from 'elements/list/list.svelte';
    import ListElement from 'elements/list/listElement.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import Tabs from 'elements/navigation/tabs.svelte';
</script>

<Tabs
      entries={Menu.user}
      entryName={MenuItem.userProfile.name}
      classes="navigation-tabs-dashboard-subpage"
/>
<TextLine>add or remove users email to newsletter</TextLine>
<br />
<TextLine>Needed routes:</TextLine>
<List classes="list-padding-left">
    <ListElement classes="list-element-dot">PUT /api/dashboard/user/newsletter/add</ListElement>
    <ListElement classes="list-element-dot">PUT /api/dashboard/user/newsletter/remove</ListElement>
    <ListElement classes="list-element-dot">GET /api/dashboard/user/newsletter/status</ListElement>
</List>
