<script lang="ts">

    import Button from 'elements/input/button.svelte';
    import {createEventDispatcher} from 'svelte';
    import {preventAutoCollapsePopup} from "stores/preventAutoCollapsePopupStore";

    let eventDispatcher = createEventDispatcher();
    let dialog: HTMLDialogElement;

    export function show() {
        dialog.showModal();
    }

    export function hide() {
        dialog.close();
    }

    function hideWithDispatch() {
        hide();
        dispatchClose();
    }

    function dispatchClose() {
        eventDispatcher('close');
    }

    function checkClickOutside(event: MouseEvent): void {
        if (preventAutoCollapsePopup()) {
            return;
        }

        const rect = dialog.getBoundingClientRect();
        const isOutside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top
            || event.clientY > rect.bottom;

        // @ts-expect-error somehow the IDE thinks this in an error. However, the value is provided.
        if (!event.target.tagName) {
            console.error('event.target.tagName is undefined');
            return;
        }

        // @ts-expect-error somehow the IDE thinks this in an error. However, the value is provided.
        if (isOutside && event.target.tagName === 'DIALOG') {
            hideWithDispatch();
        }
    }
</script>

<!--- not able to disable this A11y warning --->
<!--- the provided Button is providing the same functionality --->
<dialog on:click={checkClickOutside}
        bind:this={dialog}
>
    <div class="content-wrapper">

        <Button
                fontSize="large-text"
                classes="general-popup-close-button"
                ariaLabel="close popup"
                buttonSize="small-button"
                on:click={hideWithDispatch}>&times;
        </Button>
        <slot/>
    </div>
</dialog>

<style>
    dialog {
        z-index: 20;
        left: 50%;
        top: 50%;
        translate: -50% -50%;
        position: fixed;
        overflow: visible;
        background-color: var(--background-color-light);
        border: 1px solid var(--line-color);
        border-radius: var(--border-radius);
        height: fit-content;
        width: fit-content;
        animation: fade-out 0.3s ease-out;
    }

    dialog[open] {
        animation: fade-in 0.3s ease-out;
    }

    dialog[open]::backdrop {
        background-color: var(--background-color-transparent);
        animation: backdrop-fade-in 0.3s ease-out forwards;
    }

    .content-wrapper {
        padding: var(--2x-padding);
        position: relative;
        width: fit-content;
        height: fit-content;
        max-width: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--full-gap);
    }

    :global(.general-popup-close-button) {
        position: absolute;
        top: 0;
        right: 0;
        translate: 50% -50%;
        line-height: var(--2x-font-size);
        padding: var(--half-padding);

        @media (max-width: 1280px) {
            right: 50%;
            top: 101%;
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
            transform: scaley(0);
        }

        100% {
            opacity: 1;
            transform: scaley(1);
        }
    }

    @keyframes fade-out {
        0% {
            opacity: 1;
            transform: scaleY(1);
            display: block;
        }

        100% {
            opacity: 0;
            transform: scaleY(0);
            display: none;
        }
    }

    @keyframes backdrop-fade-in {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
</style>
