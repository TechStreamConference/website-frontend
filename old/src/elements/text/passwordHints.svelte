<script lang="ts">
    import TextLine from './textLine.svelte';
    import List from 'elements/list/list.svelte';
    import ListElement from 'elements/list/listElement.svelte';
</script>

<div class="password-list-wrapper">
    <TextLine>
        Dein Passwort sollte folgendes enthalten:
    </TextLine>
    <List classes="list-padding-left">
        <ListElement classes="list-element-dot">mind. 8 Zeichen</ListElement>
        <ListElement classes="list-element-dot">mind. 1 Kleinbuchstaben</ListElement>
        <ListElement classes="list-element-dot">mind. 1 Großbuchstaben</ListElement>
        <ListElement classes="list-element-dot">mind. 1 Zahl</ListElement>
        <ListElement classes="list-element-dot">mind. 1 Sonderzeichen</ListElement>
    </List>
</div>

<style>
    .password-list-wrapper {
        margin: var(--2x-margin) auto 0;
    }
</style>
