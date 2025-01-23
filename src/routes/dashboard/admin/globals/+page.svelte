<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadDashboard } from 'types/dashboardLoadTypes';
    import type { SetAdminGlobals } from 'types/dashboardSetTypes';

    import { Clone } from 'helper/clone';
    import { SaveMessageType } from 'types/saveMessageType';
    import { setUnsavedChanges } from 'stores/saved';
    import { trySaveDashboardDataAsync } from 'helper/trySaveDashboardData';
    import { resetGlobals } from 'stores/globals';

    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import Button from 'elements/input/button.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import Tabs from 'elements/navigation/tabs.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';

    export let data: LoadDashboard; // data from database

    let copiedData           = new Clone<LoadDashboard>(data); // copied data from database to not save original data until save
    let message: SaveMessage;
    let errorQueue: string[] = [];

    async function trySaveAsync(): Promise<boolean> {
        const adminGlobals: SetAdminGlobals = {
            footer_text: copiedData.value.globals.footer_text,
        };

        const result = await trySaveDashboardDataAsync(adminGlobals, '/api/dashboard/admin/globals', 'PUT');

        resetGlobals(); // reset cache to force a global fetch next time
        message.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorQueue = result.messages;
        return result.success;
    }
</script>

<Tabs
      entries={Menu.admin}
      entryName={MenuItem.adminGlobals.name}
      classes="navigation-tabs-dashboard-subpage"
/>
<UnsavedChangesCallbackWrapper callback={trySaveAsync} />
<SectionDashboard classes="dashboard-admin-global-section">
    <SaveMessage bind:this={message} />
    <MessageWrapper messages={errorQueue} />
    <form class="dashboard-admin-global-form"
          on:submit|preventDefault={trySaveAsync}>
		<TextArea
              classes="admin-footer-description input"
              id="admin-footer-description"
              labelText="Footer Beschreibung:"
              placeholderText="Footer Beschreibung"
              ariaLabel="Gib den Text ein, der im Footer der Internetseite angezeigt werden soll"
              bind:value={copiedData.value.globals.footer_text}
              on:submit={trySaveAsync}
              on:input={setUnsavedChanges}
        />

        <Button
              classes="dashboard-admin-global-submit-button"
              type={'submit'}
              ariaLabel="Klicke zum Speichern"
        >
            Speichern
        </Button>
    </form>
</SectionDashboard>

<style>
    :global(.dashboard-admin-global-section) {
        max-width: 100rem;
    }

    .dashboard-admin-global-form {
        display:        flex;
        flex-direction: column;
    }

    :global(.dashboard-admin-global-submit-button) {
        margin-top: var(--2x-margin);
        align-self: center;
    }
</style>
