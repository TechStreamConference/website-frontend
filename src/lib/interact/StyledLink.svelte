<script lang="ts">
    import Icon from '@/lib/assets/Icon.svelte';

    export let classes: string = '';
    export let href: string;
    export let new_tab: boolean = true;
    export let title: string;
    export let icon: string = '';
    export let text: string = '';

    export let icon_classes: string = '';
</script>

<a
        {href}
        class={classes + ' normal-font button hover-move'}
        target={new_tab ? '_blank' : ''}
        rel="noopener noreferrer"
        {title}
        on:click
>
    {#if icon}
        <Icon classes={icon_classes} type={icon}/>
    {/if}
    {#if text}
        {text}
    {/if}
</a>

<style>
    .button {
        display: inline-flex;
        align-items: center;
        gap: var(--full-gap);
        background-color: var(--primary-color-light);
        padding: var(--full-padding);
        border-radius: var(--border-radius);
        text-decoration: none;
        font-size: var(--full-font-size);
        line-height: var(--1-5x-line-height);
    }

    .transparent-background {
        background: transparent !important;
    }

    .styled-link-white {
        color: var(--white-color);
    }
</style>
