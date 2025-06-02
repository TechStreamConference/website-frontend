<script lang="ts">
    import type { SponsorLink } from 'types/provideTypes';

    import Image from 'elements/image/image.svelte';

    import { imageUrl } from 'helper/links';

    export let link: SponsorLink;

    export let classes: string = 'sponsor-size-default';
</script>

<a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      class={classes}
      title="Klicke hier um zu {link.name} zu navigieren."
      on:click
>
    <Image classes="image-default sponsor-link-hover"
           src={imageUrl(link.logo)}
           alt={link.alt_text} />
</a>

<style>
    a {
        display:         flex;
        justify-content: center;
        align-items:     center;
    }

    .sponsor-size-default {
        max-height: 100%;
        max-width:  100%;
        height:     auto;
        width:      auto;
    }

    :global(.sponsor-link-hover) {
        padding:    var(--quad-padding);
        transition: padding var(--transition-duration);
    }

    :global(.sponsor-link-hover:hover) {
        padding:    0;
        transition: padding var(--transition-duration);
    }

    :global(.sponsor-link-hover:active) {
        padding:    var(--quad-padding);
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
