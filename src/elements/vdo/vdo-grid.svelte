<script lang="ts">
    import TextLine from 'elements/text/textLine.svelte';
    import Link from 'elements/text/link.svelte';
    import Toggle from 'elements/input/toggle.svelte';
    import VodGridEntry from './vod-grid-entry.svelte';

    export let entries; // TODO typehint when datatype was provided
    export let displayAdmin: boolean = false;

    let displayCam: boolean    = true;
    let displayScreen: boolean = true;
    let displayPush: boolean   = true;
    let displayView: boolean   = true;
</script>

{#if entries.length > 0}
    <div class="link-grid">
        {#if displayAdmin}
            <TextLine classes="expand-grid-line">Raum:</TextLine>
            <Link title="Klicke hier, um zum Raum zu gelangen"
                  classes="link-inline expand-grid-line"
                  newTab={true}
                  href="https://google.de">www.google.de
            </Link>

            <div class="grid-line expand-grid-line" />
            <div class="grid-toggle-filter expand-grid-line">
                <Toggle ariaLabel="Klicke hier, um Cam Links zu filtern"
                        bind:toggle={displayCam}>
                    <TextLine slot="slotTrue"
                              classes="toggle-slot toggle-slot-true">Cam
                    </TextLine>
                    <TextLine slot="slotFalse"
                              classes="toggle-slot">Cam
                    </TextLine>
                </Toggle>
                <Toggle ariaLabel="Klicke hier, um Screen Links zu filtern"
                        bind:toggle={displayScreen}>
                    <TextLine slot="slotTrue"
                              classes="toggle-slot toggle-slot-true">Screen
                    </TextLine>
                    <TextLine slot="slotFalse"
                              classes="toggle-slot">Screen
                    </TextLine>
                </Toggle>
                <Toggle ariaLabel="Klicke hier, um Push Links zu filtern"
                        bind:toggle={displayPush}>
                    <TextLine slot="slotTrue"
                              classes="toggle-slot toggle-slot-true">Push
                    </TextLine>
                    <TextLine slot="slotFalse"
                              classes="toggle-slot">Push
                    </TextLine>
                </Toggle>
                <Toggle ariaLabel="Klicke hier, um View Links zu filtern"
                        bind:toggle={displayView}>
                    <TextLine slot="slotTrue"
                              classes="toggle-slot toggle-slot-true">View
                    </TextLine>
                    <TextLine slot="slotFalse"
                              classes="toggle-slot">View
                    </TextLine>
                </Toggle>
            </div>
        {/if}

        {#each entries as e}
            <div class="grid-line expand-grid-line" />
            <TextLine classes="expand-grid-line">{e.name}:</TextLine>
            {#if displayCam && displayPush}
                <VodGridEntry description={"Cam" + (displayAdmin ? " Push:" : "")}
                              visible={true}
                              link={e.push_cam} />
            {/if}
            {#if displayScreen && displayPush}
                <VodGridEntry description={"Screen" + (displayAdmin ? " Push:" : "")}
                              visible={true}
                              link={e.push_screen} />
            {/if}
            {#if displayAdmin}
                {#if displayCam && displayView}
                    <VodGridEntry description="Cam View:"
                                  visible={true}
                                  link={e.view_cam} />
                {/if}
                {#if displayScreen && displayView}
                    <VodGridEntry description="Screen View:"
                                  visible={true}
                                  link={e.view_screen} />
                {/if}
            {/if}
        {/each}
    </div>
{/if}

<style>
    .link-grid {
        display:               grid;
        gap:                   var(--full-gap);
        grid-template-columns: auto 1fr auto;
        width:                 100%;
    }

    .grid-toggle-filter {
        display:         flex;
        flex-direction:  row;
        gap:             var(--full-gap);
        justify-content: center;
    }

    :global(.toggle-slot) {
        padding:       var(--full-padding);
        color:         var(--text-color);
        border-radius: var(--border-radius);
    }

    :global(.toggle-slot-true) {
        background: var(--primary-color-dark);
    }

    .grid-line {
        border-top: 1px solid var(--background-color-light);
    }

    :global(.expand-grid-line) {
        grid-column: 1/4
    }
</style>
