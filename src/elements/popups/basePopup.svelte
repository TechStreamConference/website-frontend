<script lang="ts">

    import { fade } from 'svelte/transition';
    import Button from 'elements/input/button.svelte';
    import { createEventDispatcher } from 'svelte';

    let _show           = false;
    let eventDispatcher = createEventDispatcher();

    export function show() {
        _show = true;
    }

    export function hide() {
        _show = false;
    }

    function dispatchClose() {
        eventDispatcher('close');
    }
</script>


<dialog open={_show}
        role="alertdialog"
        transition:fade={{ duration: 300 }}>
    <button class="general-popup-close"
            on:click={() => { hide(); dispatchClose(); }}>

        <span class="general-popup-modal"
              on:click={e => e.stopPropagation()}
              role="presentation">

              <Button
                    fontSize="large-text"
                    classes="general-popup-close-button"
                    ariaLabel="close popup"
                    buttonSize="small-button"
                    on:click={() => { hide(); dispatchClose(); }}>&times;
              </Button>
              <slot />
        </span>
    </button>
</dialog>

<style>
    dialog {
        top:              0;
        left:             0;
        height:           100vh;
        width:            100vw;
        background-color: var(--background-color-transparent);
        z-index:          20;
    }

    dialog[open] {
        display: flex;
    }

    .general-popup-close {
        all:             unset;
        height:          100%;
        width:           100%;
        display:         flex;
        justify-content: center;
        align-items:     center;
    }

    .general-popup-modal {
        position:         relative;
        display:          flex;
        flex-direction:   column;
        background-color: var(--background-color-light);
        padding:          var(--2x-padding);
        border:           1px solid var(--line-color);
        border-radius:    var(--border-radius);
        gap:              var(--full-gap);
        align-items:      center;
        height:           fit-content;
        width:            fit-content;
    }

    :global(.general-popup-close-button) {
        position:    absolute;
        top:         0;
        right:       0;
        translate:   50% -50%;
        line-height: var(--2x-font-size);
        padding:     var(--half-padding);
    }
</style>
