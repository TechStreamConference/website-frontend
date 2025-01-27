<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { SaveResult } from 'helper/trySaveData';
    import type { LoadUserProfile } from 'types/dashboardLoadTypes';

    import { setUnsavedChanges } from 'stores/saved';
    import { trySaveDataAsync } from 'helper/trySaveData';
    import { SaveMessageType } from 'types/saveMessageType';
    import { fade } from 'svelte/transition';
    import { loadUserData } from './profileHelper';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import Input from 'elements/input/input.svelte';
    import Button from 'elements/input/button.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import TextLine from 'elements/text/textLine.svelte';

    enum State {
        None,
        Mail,
        Password,
        Name,
    }

    export let data: LoadUserProfile;
    let state: State = State.None;

    let saveMessage: SaveMessage;
    let errorList: string[] = [];

    let name: string         = '';
    let mail: string         = '';
    let newPassword1: string = '';
    let newPassword2: string = '';
    let oldPassword: string  = '';

    function changeState(value: State) {
        if (state === State.None) {
            state = value;
            return;
        }

        state = State.None;
        setTimeout(() => {
            state = value;
        }, 300);
    }

    async function save<T>(toSave: T, url: string): Promise<SaveResult> {
        const response = await trySaveDataAsync(fetch, toSave, url, 'PUT');

        saveMessage.setSaveMessage(response.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = response.messages;

        if (response.success) {
            oldPassword = '';
            changeState(State.None);
        }

        return response;
    }

    async function saveName(): Promise<void> {
        const toSave = {
            username: name.trim(),
            password: oldPassword.trim(),
        };

        const response = await save(toSave, '/api/account/change-username');

        if (response.success) {
            name          = '';
            data.userData = await loadUserData(fetch);
        }
    }

    async function saveMail(): Promise<void> {
        const toSave = {
            email:    mail.trim(),
            password: oldPassword.trim(),
        };

        const response = await save(toSave, '/api/account/change-email');

        if (response.success) {
            mail       = '';
            errorList = [ // assignment because of reactivity
                ...errorList,
                'Du musst deine E-Mail-Adresse erst bestätigen, damit sie hier angezeigt wird.',
            ];
            // no fetch of user data because the mail has to be verified first
        }
    }

    async function savePassword(): Promise<void> {
        if (newPassword1.trim() !== newPassword2.trim()) {
            saveMessage.setSaveMessage(SaveMessageType.Error);
            errorList = ['Die beiden neuen Passwörter stimmen nicht überein.'];
            return;
        }
        const toSave = {
            new_password: newPassword1.trim(),
            old_password: oldPassword.trim(),
        };

        const response = await save(toSave, '/api/account/change-password');

        if (response.success) {
            newPassword1 = '';
            newPassword2 = '';
            // no fetch of user data because the password does not get displayed anyway.
        }
    }
</script>

<Tabs
      entries={Menu.user}
      entryName={MenuItem.userProfile.name}
      classes="navigation-tabs-dashboard-subpage"
/>
<SectionDashboard classes="standard-dashboard-section dashboard-user-profile-section-wrapper">
    <div class="dashboard-user-profile-section-entry-wrapper">
        <div class="dashboard-user-profile-entry-grid">
            <TextLine>Name:</TextLine>
            <TextLine>{data.userData.username}</TextLine>
            <TextLine>Mail:</TextLine>
            <TextLine>{data.userData.email}</TextLine>
        </div>
        <div class="dashboard-user-profile-button-wrapper">
            <Button ariaLabel="Klicke, um deinen Namen zu ändern."
                    on:click={() => {changeState(State.Name)}}>Name ändern
            </Button>
            <Button ariaLabel="Klicke, um deine E-Mail zu ändern."
                    on:click={() => {changeState(State.Mail)}}>E-Mail ändern
            </Button>
            <Button ariaLabel="Klicke, um dein Passwort zu ändern."
                    on:click={() => {changeState(State.Password)}}>Passwort ändern
            </Button>
        </div>
    </div>
</SectionDashboard>
<SectionDashboard classes="standard-dashboard-section">
    <SaveMessage bind:this={saveMessage} />
    <MessageWrapper messages={errorList} />
</SectionDashboard>
{#if state === State.Name}
    <div class="dashboard-user-profile-transition-wrapper"
         transition:fade={{ duration: 300 }}>
        <SectionDashboard classes="standard-dashboard-section dashboard-user-profile-section-wrapper">
            <form class="dashboard-user-profile-section-entry-wrapper"
                  on:submit|preventDefault={saveName}>
                <SubHeadline classes="sub-headline-center">Name</SubHeadline>
                <Input id="dashboard-user-profile-input-username-password"
                       labelText="Passwort:"
                       placeholderText="Passwort"
                       ariaLabel="Trage hier dein Passwort ein"
                       type="password"
                       bind:value={oldPassword}
                       on:input={setUnsavedChanges} />
                <Input id="dashboard-user-profile-input-username"
                       labelText="neuer Name:"
                       placeholderText="neuer Name"
                       ariaLabel="Trage hier deinen neuen Namen ein"
                       bind:value={name}
                       on:input={setUnsavedChanges} />
                <div class="dashboard-user-profile-button-wrapper">
                    <Button type="submit"
                            ariaLabel="Klicke, um deinen neuen Namen zu speichern">Speichern
                    </Button>
                </div>
            </form>
        </SectionDashboard>
    </div>
{:else if state === State.Mail}
    <div class="dashboard-user-profile-transition-wrapper"
         transition:fade={{ duration: 300 }}>
        <SectionDashboard classes="standard-dashboard-section dashboard-user-profile-section-wrapper">
            <form class="dashboard-user-profile-section-entry-wrapper"
                  on:submit|preventDefault={saveMail}>
                <SubHeadline classes="sub-headline-center">E-Mail</SubHeadline>
                <Input id="dashboard-user-profile-input-mail-password"
                       labelText="Passwort:"
                       placeholderText="Passwort"
                       ariaLabel="Trage hier dein Passwort ein"
                       type="password"
                       bind:value={oldPassword}
                       on:input={setUnsavedChanges} />
                <Input id="dashboard-user-profile-input-mail"
                       labelText="neue E-Mail:"
                       placeholderText="neue E-Mail"
                       ariaLabel="Trage hier deine neue E-Mail ein"
                       bind:value={mail}
                       on:input={setUnsavedChanges} />
                <div class="dashboard-user-profile-button-wrapper">
                    <Button type="submit"
                            ariaLabel="Klicke, um deine neue E-Mail zu speichern">Speichern
                    </Button>
                </div>
            </form>
        </SectionDashboard>
    </div>
{:else if state === State.Password}
    <div class="dashboard-user-profile-transition-wrapper"
         transition:fade={{ duration: 300 }}>
        <SectionDashboard classes="standard-dashboard-section dashboard-user-profile-section-wrapper">
            <form class="dashboard-user-profile-section-entry-wrapper"
                  on:submit|preventDefault={savePassword}>
                <SubHeadline classes="sub-headline-center">Passwort</SubHeadline>
                <Input id="dashboard-user-profile-input-password-old"
                       labelText="Altes Passwort:"
                       placeholderText="Altes Passwort"
                       ariaLabel="Trage hier dein altes Passwort ein"
                       type="password"
                       bind:value={oldPassword}
                       on:input={setUnsavedChanges} />
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
                <div class="dashboard-user-profile-button-wrapper">
                    <Button type="submit"
                            ariaLabel="Klicke, um dein neues Passwort zu speichern">Speichern
                    </Button>
                </div>
            </form>
        </SectionDashboard>
    </div>
{/if}


<style>
    :global(.dashboard-user-profile-section-wrapper) {
        border:        1px solid var(--primary-color-dark);
        border-radius: var(--border-radius);
    }

    .dashboard-user-profile-transition-wrapper {
        display:         flex;
        justify-content: center;
    }

    .dashboard-user-profile-entry-grid {
        display:               grid;
        grid-template-columns: auto auto;
        gap:                   var(--full-gap);
        margin:                0 auto;
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
