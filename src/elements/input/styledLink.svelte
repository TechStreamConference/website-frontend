<script lang="ts">
    import Icon from 'elements/image/icon.svelte';

    export let classes: string = '';
    export let href: string;
    export let newTab: boolean = true;
    export let title: string;
    export let icon: string = '';
    export let text: string = '';

    export let iconClasses: string = '';
    export let textClasses: string = '';
</script>

<a {href}
   class={classes + ' normal-font button hover-move'}
   target={newTab ? '_blank' : ''}
   rel="noopener noreferrer"
   {title}
   on:click
>
    {#if icon}
        <Icon classes={iconClasses} type={icon}/>
    {/if}
    {#if text}
        <span class={textClasses}>
            {text}
        </span>
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

    @media (max-width: 600px) {
        .hide-text-on-mobile {
            display: none;
        }
    }
</style>
