<script lang="ts">
    import type { DashboardAdminVdoLink } from 'types/dashboardProvideTypes';

    import TextLine from 'elements/text/textLine.svelte';
    import Toggle from 'elements/input/toggle.svelte';
    import VodGridEntry from './vod-grid-entry.svelte';

    export let entries: DashboardAdminVdoLink | undefined;
    export let displayAdmin: boolean = false;

    let displayCam: boolean    = true;
    let displayScreen: boolean = true;
    let displayPush: boolean   = true;
    let displayView: boolean   = true;
</script>

{#if entries !== undefined}
    <div class="link-grid">
        {#if displayAdmin}
            <div class="grid-line expand-grid-line" />
            <VodGridEntry description="Raum:"
                          visible={true}
                          link={entries.director} />

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

        {#each entries.speakers as e}
            <div class="grid-line expand-grid-line" />
            <TextLine classes="expand-grid-line">{e.name}:</TextLine>
            <VodGridEntry description={"Cam" + (displayAdmin ? " Push:" : "")}
                          visible={displayCam && displayPush}
                          link={e.push_cam} />
            <VodGridEntry description={"Screen" + (displayAdmin ? " Push:" : "")}
                          visible={displayScreen && displayPush}
                          link={e.push_screen} />
            {#if displayAdmin}
                <VodGridEntry description="Cam View:"
                              visible={displayCam && displayView}
                              link={e.view_cam} />
                <VodGridEntry description="Screen View:"
                              visible={displayScreen && displayView}
                              link={e.view_screen} />
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
