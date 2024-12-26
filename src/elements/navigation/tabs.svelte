<script lang="ts">
    import type { Menu } from 'types/provideTypes';

    import TextLine from 'elements/text/textLine.svelte';

    import { goto } from '$app/navigation';

    export let alignment: string  = 'navigation-tabs-center';
    export let background: string = 'navigation-tabs-default-background';

    export let entryName: string;
    export let entries: Menu;
    export let classes: string = '';
    export let color: string   = '';

    let current: number = 0;

    function initial(): void {
        for (let i = 0; i < entries.length; ++i) {
            if (entries[i].name === entryName) {
                current = i;
                return;
            }
        }
        console.error(`not able to set navigation tab for entry ${entryName}`);
    }

    initial();
</script>

<div class="navigation-tabs {classes} {alignment} {background}">
    {#each entries as entry, index}
        <div
              class="navigation-tabs-entry {index === current
				? 'navigation-tabs-active navigation-tabs-default-background'
				: background}"
              on:click={() => {
				goto(entry.url);
			}}
              role="presentation"
        >
            <a class="navigation-tabs-button"
               href={entry.url}
               aria-label={entry.description}>
                <TextLine
                      classes="navigation-tabs-entry-text {index === current ? '' : `text-line-${color}`}"
                >
                    {entry.name}
                </TextLine>
            </a>
        </div>
    {/each}
</div>

<style>
    .navigation-tabs {
        display:        flex;
        flex-direction: row;
        border-bottom:  1px solid var(--line-color);
        padding:        0 var(--2x-padding);
        margin-bottom:  var(--full-margin);
        width:          100%;
    }

    .navigation-tabs-center {
        justify-content: center;
    }

    .navigation-tabs-end {
        justify-content: end;
    }

    .navigation-tabs-purple {
        background-color: var(--primary-color-dark);
    }

    .navigation-tabs-default-background {
        background-color: var(--background-color);
    }

    .navigation-tabs-dashboard-subpage {
        max-width:  100rem;
        align-self: center;
        margin-top: var(--2x-margin);
    }

    .navigation-tabs-entry {
        transition:              background-color var(--transition-duration);

        margin:                  var(--full-margin) var(--full-margin) 0;
        padding:                 var(--full-padding);

        cursor:                  pointer;

        border-top-left-radius:  var(--border-radius);
        border-top-right-radius: var(--border-radius);
    }

    .navigation-tabs-entry:hover {
        background-color: var(--background-color-light);
        transition:       background-color var(--transition-duration);
    }

    .navigation-tabs-active {
        transform:               translateY(1px);
        border:                  1px solid var(--line-color);
        border-top-right-radius: var(--border-radius);
        border-top-left-radius:  var(--border-radius);
        border-bottom-color:     transparent;
    }

    :global(.navigation-tabs-entry-text) {
        font-size: var(--1-5x-font-size);
    }

    .navigation-tabs-button {
        border:           none;
        background-color: transparent;
        cursor:           pointer;
        text-decoration:  none;
    }

    @media (max-width: 600px) {
        .navigation-tabs-entry {
            margin:  var(--half-margin) var(--half-margin) 0;
            padding: var(--half-padding);
        }

        :global(.navigation-tabs-entry-text) {
            font-size: var(--full-font-size);
        }
    }
</style>
