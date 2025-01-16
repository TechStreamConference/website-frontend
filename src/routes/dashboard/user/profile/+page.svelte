<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { SaveDashboardResult } from 'helper/trySaveDashboardData';

    import { setUnsavedChanges } from 'stores/saved';
    import { trySaveDashboardDataAsyncNew } from 'helper/trySaveDashboardData';
    import { SaveMessageType } from 'types/saveMessageType';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import HeadlineH2 from 'elements/text/headlineH2.svelte';
    import Input from 'elements/input/input.svelte';
    import Button from 'elements/input/button.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';

    let saveMessageName: SaveMessage;
    let errorMessagesName: string[]     = [];
    let saveMessageMail: SaveMessage;
    let errorMessagesMail: string[]     = [];
    let saveMessagePassword: SaveMessage;
    let errorMessagesPassword: string[] = [];

    let name: string         = '';
    let mail: string         = '';
    let newPassword1: string = '';
    let newPassword2: string = '';
    let oldPassword: string  = '';

    async function save<T>(toSave: T, url: string, saveMessage: SaveMessage): Promise<SaveDashboardResult> {
        const response = await trySaveDashboardDataAsyncNew(toSave, url, 'PUT');
        saveMessage.setSaveMessage(response.success ? SaveMessageType.Save : SaveMessageType.Error);

        if (response.success) {
            oldPassword = '';
        }

        return response;
    }

    async function saveName(): Promise<void> {
        errorMessagesName = [];
        const toSave      = {
            username: name.trim(),
            password: oldPassword.trim(),
        };

        const response = await save(toSave, '/api/account/change-username', saveMessageName);

        if (response.success) {
            name = '';
        } else {
            errorMessagesName = response.messages;
        }
    }

    async function saveMail(): Promise<void> {
        errorMessagesMail = [];
        const toSave      = {
            email:    mail.trim(),
            password: oldPassword.trim(),
        };

        const response = await save(toSave, '/api/account/change-email', saveMessageMail);

        if (response.success) {
            mail = '';
        } else {
            errorMessagesMail = response.messages;
        }
    }

    async function savePassword(): Promise<void> {
        if (newPassword1.trim() !== newPassword2.trim()) {
            saveMessagePassword.setSaveMessage(SaveMessageType.Error);
            errorMessagesPassword = ['Die beiden neuen Passwörter stimmen nicht überein.'];
            return;
        }
        errorMessagesPassword = [];
        const toSave          = {
            new_password: newPassword1.trim(),
            old_password: oldPassword.trim(),
        };

        const response = await save(toSave, '/api/account/change-password', saveMessagePassword);

        if (response.success) {
            newPassword1 = '';
            newPassword2 = '';
        } else {
            errorMessagesPassword = response.messages;
        }
    }
</script>

<Tabs
      entries={Menu.user}
      entryName={MenuItem.userProfile.name}
      classes="navigation-tabs-dashboard-subpage"
/>

<SectionDashboard classes="standard-dashboard-section dashboard-user-profile-section-wrapper">
    <SaveMessage bind:this={saveMessageName} />
    <MessageWrapper messages={errorMessagesName} />
    <form class="dashboard-user-profile-section-entry-wrapper"
          on:submit|preventDefault={saveName}>
        <HeadlineH2>Name</HeadlineH2>
        <Input id="dashboard-user-profile-input-username"
               labelText="neuer Name:"
               placeholderText="neuer Name"
               ariaLabel="Trage hier deinen neuen Namen ein"
               bind:value={name}
               on:input={setUnsavedChanges} />
        <Input id="dashboard-user-profile-input-username-password"
               labelText="Passwort:"
               placeholderText="Passwort"
               ariaLabel="Trage hier dein Passwort ein"
               type="password"
               bind:value={oldPassword}
               on:input={setUnsavedChanges} />
        <div class="dashboard-user-profile-button-wrapper">
            <Button type="submit"
                    ariaLabel="Klicke, um deinen neuen Namen zu speichern">Speichern
            </Button>
        </div>
    </form>
</SectionDashboard>
<SectionDashboard classes="standard-dashboard-section dashboard-user-profile-section-wrapper">
    <SaveMessage bind:this={saveMessageMail} />
    <MessageWrapper messages={errorMessagesMail} />
    <form class="dashboard-user-profile-section-entry-wrapper"
          on:submit|preventDefault={saveMail}>
        <HeadlineH2>E-Mail</HeadlineH2>
        <Input id="dashboard-user-profile-input-mail"
               labelText="neue E-Mail:"
               placeholderText="neue E-Mail"
               ariaLabel="Trage hier deine neue E-Mail ein"
               bind:value={mail}
               on:input={setUnsavedChanges} />
        <Input id="dashboard-user-profile-input-mail-password"
               labelText="Passwort:"
               placeholderText="Passwort"
               ariaLabel="Trage hier dein Passwort ein"
               type="password"
               bind:value={oldPassword}
               on:input={setUnsavedChanges} />
        <div class="dashboard-user-profile-button-wrapper">
            <Button type="submit"
                    ariaLabel="Klicke, um deine neue E-Mail zu speichern">Speichern
            </Button>
        </div>
    </form>
</SectionDashboard>
<SectionDashboard classes="standard-dashboard-section dashboard-user-profile-section-wrapper">
    <SaveMessage bind:this={saveMessagePassword} />
    <MessageWrapper messages={errorMessagesPassword} />
    <form class="dashboard-user-profile-section-entry-wrapper"
          on:submit|preventDefault={savePassword}>
        <HeadlineH2>Passwort</HeadlineH2>
        <Input id="dashboard-user-profile-input-password-new-1"
               labelText="Neues Passwort:"
               placeholderText="Neues Passwort"
               ariaLabel="Trage hier dein neues Passwort ein"
               type="password"
               bind:value={newPassword1}
               on:input={setUnsavedChanges} />
        <Input id="dashboard-user-profile-input-password-new-2"
               labelText="Wiederholung neues Passwort:"
               placeholderText="Wiederholung neues Passwort"
               ariaLabel="Wiederhole hier dein neues Passwort ein"
               type="password"
               bind:value={newPassword2}
               on:input={setUnsavedChanges} />
        <Input id="dashboard-user-profile-input-password-old"
               labelText="Altes Passwort:"
               placeholderText="Altes Passwort"
               ariaLabel="Trage hier dein altes Passwort ein"
               type="password"
               bind:value={oldPassword}
               on:input={setUnsavedChanges} />
        <div class="dashboard-user-profile-button-wrapper">
            <Button type="submit"
                    ariaLabel="Klicke, um dein neues Passwort zu speichern">Speichern
            </Button>
        </div>
    </form>
</SectionDashboard>


<style>
    :global(.dashboard-user-profile-section-wrapper) {
        border:        1px solid var(--primary-color-dark);
        border-radius: var(--border-radius);
    }

    .dashboard-user-profile-section-entry-wrapper {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
        padding:        var(--2x-padding) 0 var(--4x-padding);
    }

    .dashboard-user-profile-button-wrapper {
        display:         flex;
        flex-direction:  row;
        justify-content: center;
        gap:             var(--2x-gap);
        margin-top:      var(--2x-margin);
    }
</style>
