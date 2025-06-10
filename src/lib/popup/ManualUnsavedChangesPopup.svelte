<script lang="ts">
    import { save_callback } from '@/stores/saveCallback';
    import { reset_unsaved_changes } from '@/stores/saved';

    import Button from '@/lib/interact/Button.svelte';
    import SubHeadline from '@/lib/text/SubHeadline.svelte';
    import BasePopup from '@/lib/popup/BasePopup.svelte';

    export let stay_callback: () => void;
    export let navigate_callback: () => void;

    let save_button: boolean = false;
    let base_popup: BasePopup;

    export function show(): void {
        save_button = check_save_button();
        base_popup.show();
    }

    export function hide(): void {
        base_popup.hide();
    }

    function check_save_button(): boolean {
        const returnValue = save_callback();
        return typeof returnValue === 'function';
    }

    function stay(): void {
        hide();
        stay_callback();
    }

    function navigate(): void {
        reset_unsaved_changes();
        hide();
        navigate_callback();
    }

    async function save(): Promise<void> {
        const callback = save_callback();
        if (callback) {
            const result = await callback();
            if (result) {
                navigate();
                return;
            }
            stay();
            return;
        }

        console.error('not able to call callback in the unsaved changes popup');
        stay();
    }
</script>

<BasePopup bind:this={base_popup}>
    <SubHeadline classes="white">Es gibt ungespeicherte Änderungen</SubHeadline>
    <div class="unsaved-changes-button-wrapper">
        <Button on:click={stay}
                ariaLabel="Klicke hier, um auf der Seite zu bleiben">
            Auf Seite bleiben
        </Button>
        {#if save_button}
            <Button
                  on:click={save}
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
