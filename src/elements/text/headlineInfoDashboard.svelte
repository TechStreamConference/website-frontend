<script lang="ts">
    import Headline from 'elements/text/headline.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';

    export let headline: string;
</script>

<div class="dashboard-user">
    <div class="dashboard-user-headline-wrapper">
        <Headline classes="headline-border">{headline}</Headline>
    </div>
    <Paragraph>
        <slot/>
    </Paragraph>
</div>

<style>
    .dashboard-user {
        display: flex;
        flex-direction: column;
        max-width: 100rem;
        margin: var(--2x-margin) auto 0;
        text-align: center;
        gap: var(--2x-gap);
    }

    .dashboard-user-headline-wrapper {
        margin: 0 auto;
    }
</style>
