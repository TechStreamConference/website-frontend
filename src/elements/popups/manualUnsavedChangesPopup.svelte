<script lang="ts">
    import { saveCallback } from 'stores/saveCallback';
    import { resetUnsavedChanges } from 'stores/saved';

    import Button from 'elements/input/button.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import BasePopup from 'elements/popups/basePopup.svelte';

    export let stayCallback: () => void;
    export let navigateCallback: () => void;

    let saveButton: boolean = false;
    let basePopup: BasePopup;

    export function show(): void {
        saveButton = checkSaveButton();
        basePopup.show();
    }

    export function hide(): void {
        basePopup.hide();
    }

    function checkSaveButton(): boolean {
        const returnValue = saveCallback();
        return typeof returnValue === 'function';
    }

    function stay(): void {
        hide();
        stayCallback();
    }

    function navigate(): void {
        resetUnsavedChanges();
        hide();
        navigateCallback();
    }

    async function saveAsync(): Promise<void> {
        const callback = saveCallback();
        if (callback) {
            const result = await callback();
            if (result) {
                navigate();
                return;
            }
            stay();
            return;
        }

        console.error('not able to call callback in unsaved changes popup');
        stay();
    }
</script>

<BasePopup bind:this={basePopup}>
    <SubHeadline classes="white">Es gibt ungespeicherte Änderungen</SubHeadline>
    <div class="unsaved-changes-button-wrapper">
        <Button on:click={stay}
                ariaLabel="Klicke hier, um auf der Seite zu bleiben">
            Auf Seite bleiben
        </Button>
        {#if saveButton}
            <Button
                  on:click={saveAsync}
                  ariaLabel="Klicke hier, um die Änderungen zu speichern und die Seite zu verlassen"
            >
                Speichern und Verlassen
            </Button>
        {/if}
        <Button on:click={navigate}
                ariaLabel="Klicke hier, um die Seite zu verlassen">
            Seite verlassen
        </Button>
    </div>
</BasePopup>

<style>
    .unsaved-changes-button-wrapper {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);
    }
</style>
