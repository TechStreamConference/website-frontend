<script lang="ts">
    import type { SponsorLinks } from 'types/provideTypes';

    import Sponsor from 'elements/sponsor/sponsor.svelte';
    import TextLine from 'elements/text/textLine.svelte';

    export let logos: SponsorLinks;

    export let classes: string = '';
</script>

<div class="sponsor-array-image-grid {classes}">
    {#each logos as logo}
        <div class="sponsor-array-image-container">
            <Sponsor link={logo}
                     classes={'sponsor-array-link'} />
            {#if logo.copyright}
                <TextLine classes="sponsor-array-text-line">{logo.copyright}</TextLine>
            {/if}
        </div>
    {/each}
</div>

<style>
    .sponsor-array-image-grid {
        display:               grid;
        grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
        gap:                   var(--4x-gap);
    }

    .sponsor-array-image-container {
        display:         flex;
        flex-direction:  column;
        align-items:     center;
        justify-content: space-between;
        text-align:      center;
    }

    :global(.sponsor-array-link) {
        height: 16rem;
    }

    :global(.sponsor-array-text-line) {
        margin-top: var(--full-margin);
    }
</style>
