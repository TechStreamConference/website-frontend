<script lang="ts">
    import {reset_unsaved_changes, unsaved_changes} from '@/stores/saved';
    import {beforeNavigate, goto} from '$app/navigation';
    import {save_callback} from '@/stores/saveCallback';

    import BasePopup from '@/lib/popup/BasePopup.svelte';
    import Button from '@/lib/interact/Button.svelte';
    import SubHeadline from '@/lib/text/SubHeadline.svelte';

    let base_popup: BasePopup;
    let url: URL;

    let save_button: boolean = false;

    function check_save_button(): boolean {
        const returnValue = save_callback();
        return typeof returnValue === 'function';
    }

    function navigate(): void {
        reset_unsaved_changes();
        base_popup.hide();
        goto(url);
    }

    function stay(): void {
        base_popup.hide();
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

        console.error('not able to call callback in unsaved changes popup');
        stay();
    }

    beforeNavigate(({
        to,
        cancel,
    }) => {
        save_button = check_save_button();

        if (!unsaved_changes()) {
            return;
        }

        cancel();

        if (to) {
            url = to.url;
        }
        base_popup.show();
    });
</script>

<BasePopup bind:this={base_popup}
           on:close={stay}>
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
        display: flex;
        flex-direction: row;
        gap: var(--full-gap);
    }
</style>
