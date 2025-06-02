<script lang="ts">
    import { resetUnsavedChanges, unsavedChanges } from 'stores/saved';
    import { beforeNavigate, goto } from '$app/navigation';
    import { saveCallback } from 'stores/saveCallback';

    import BasePopup from 'elements/popups/basePopup.svelte';
    import Button from 'elements/input/button.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';

    let basePopup: BasePopup;
    let url: URL;

    let saveButton: boolean = false;

    function checkSaveButton(): boolean {
        const returnValue = saveCallback();
        return typeof returnValue === 'function';
    }

    function navigate(): void {
        resetUnsavedChanges();
        basePopup.hide();
        goto(url);
    }

    function stay(): void {
        basePopup.hide();
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

    beforeNavigate(({
                        to,
                        cancel,
                    }) => {
        saveButton = checkSaveButton();

        if (!unsavedChanges()) {
            return;
        }

        cancel();

        if (to) {
            url         = to.url;
        }
        basePopup.show();
    });
</script>

<BasePopup bind:this={basePopup}
           on:close={stay}>
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
