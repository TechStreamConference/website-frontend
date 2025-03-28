<script lang="ts">
    import type { Menu } from 'types/provideTypes';

    import TextLine from 'elements/text/textLine.svelte';
    import { onMount } from 'svelte';

    export let entries: Menu;
    export let entryName: string;
    export let classes: string                      = '';
    export let position: 'start' | 'center' | 'end' = 'start';
    export let color: 'default' | 'purple'          = 'default';

    let current: number = 0;

    onMount(() => {
        for (let i = 0; i < entries.length; ++i) {
            if (entries[i].name === entryName) {
                current = i;
                return;
            }
        }
        console.error(`not able to set navigation tab for entry ${entryName}`);
    });

</script>


<div class="navigation-tabs {classes} {color}-background navigation-tabs-{position}">
    {#each entries as entry, index}
        <a class="navigation-tabs-entry {index === current ? 'navigation-tabs-selected-border' : ''} {index===current ? 'tab-background-selected' : ''}"
           title={entry.description}
           href={entry.url}>
            <TextLine classes="navigation-tabs-text-line {index !== current ? `tab-${color}-text-unselected` : ''}">
                {entry.name}
            </TextLine>
        </a>
    {/each}
</div>


<style>
    .navigation-tabs-start {
        justify-content: start;
    }

    .navigation-tabs-center {
        justify-content: center;
    }

    .navigation-tabs-end {
        justify-content: end;
    }

    .subpage-navigation-tabs {
        width:      fit-content;
        min-width:  100rem;
        max-width:  calc(100vw - 5rem);
        align-self: center;
    }

    .subpage-navigation-tabs-wide-tabs-override {
        min-width: 150rem !important;
    }

    .navigation-tabs {
        display:        flex;
        flex-direction: row;
        border-bottom:  1px solid var(--line-color);
        padding:        0 var(--2x-padding);
        margin-bottom:  var(--full-margin);
        gap:            var(--full-gap);
        padding-top:    var(--full-padding);
    }

    .purple-background {
        background: var(--primary-color-dark);
    }

    .navigation-tabs-wide-dashboard-override {
        min-width: 150rem !important;
    }

    .navigation-tabs-entry {
        transition:              background-color var(--transition-duration),
                                 border var(--transition-duration);
        padding:                 var(--full-padding) var(--2x-padding);
        border-top-right-radius: var(--border-radius);
        border-top-left-radius:  var(--border-radius);
        border-bottom:           var(--background-color);
        transform:               translateY(1px);
        text-decoration:         none;
        border:                  1px solid transparent;
    }

    .navigation-tabs-entry:hover {
        transition:   background-color var(--transition-duration),
                      border var(--transition-duration);

        background:   var(--background-color-light);
        border-top:   1px solid var(--line-color);
        border-left:  1px solid var(--line-color);
        border-right: 1px solid var(--line-color);
    }

    :global(.navigation-tabs-entry .navigation-tabs-text-line) {
        transition: color var(--transition-duration);
    }

    :global(.navigation-tabs-entry:hover .navigation-tabs-text-line) {
        transition: color var(--transition-duration);
        color:      var(--text-color);
    }

    .navigation-tabs-selected-border {
        border-top:   1px solid var(--line-color);
        border-left:  1px solid var(--line-color);
        border-right: 1px solid var(--line-color);
    }

    :global(.tab-purple-text-unselected) {
        color: var(--white-color);
    }

    .tab-background-selected {
        background: var(--background-color);
    }

    :global(.navigation-tabs-text-line) {
        font-size: var(--1-5x-font-size);
    }

    @media (max-width: 1280px) {
        .subpage-navigation-tabs {
            min-width: 0;
        }

        :global(.navigation-tabs-text-line) {
            font-size: var(--full-font-size);
        }

        .navigation-tabs-entry {
            padding: var(--half-padding) var(--full-padding);
        }
    }
</style>
