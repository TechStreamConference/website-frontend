<script lang="ts">
    import type {SponsorLink} from 'types/provideTypes';
    import {isDarkStore} from "stores/theme";
    import {imageUrl} from 'helper/links';
    import Image from 'elements/image/image.svelte';


    export let link: SponsorLink;
    export let classes: string = 'sponsor-size-default';

    $: isAlternativeActive = $isDarkStore && link.logo_alternative;
    $: alternativeClass = isAlternativeActive ? '' : 'sponsor-logo-none';
    $: defaultClass = isAlternativeActive ? 'sponsor-logo-none' : '';
</script>

<a
        itemprop="url"
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        class={classes}
        title="Klicke hier um zu {link.name} zu navigieren."
        on:click
>
    <Image classes="image-default {defaultClass} sponsor-link-hover"
           src={imageUrl(link.logo)}
           alt={link.alt_text}
    />
    {#if link.logo_alternative}
        <Image classes="image-default {alternativeClass} sponsor-link-hover"
               src={imageUrl(link.logo_alternative)}
               alt={link.alt_text}
        />
    {/if}
    <meta itemprop="name" content={link.name}/>
</a>

<style>
    a {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.sponsor-logo-none) {
        display: none;
    }

    .sponsor-size-default {
        max-height: 100%;
        max-width: 100%;
        height: auto;
        width: auto;
    }

    :global(.sponsor-link-hover) {
        padding: var(--quad-padding);
        transition: padding var(--transition-duration);
    }

    :global(.sponsor-link-hover:hover) {
        padding: 0;
        transition: padding var(--transition-duration);
    }

    :global(.sponsor-link-hover:active) {
        padding: var(--quad-padding);
        transition: padding var(--transition-duration);
    }

    @media (max-width: 1280px) {
        :global(.sponsor-link-hover) {
            padding: var(--quad-padding);
        }

        :global(.sponsor-link-hover:hover) {
            padding: var(--quad-padding);
        }

        :global(.sponsor-link-hover:active) {
            padding: var(--quad-padding);
        }
    }
</style>
