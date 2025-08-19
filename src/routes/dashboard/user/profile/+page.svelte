<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import type { SaveResult } from 'helper/trySaveData';
    import type { LoadDashboard } from 'types/dashboardLoadTypes';

    import { setUnsavedChanges } from 'stores/saved';
    import { trySaveDataAsync } from 'helper/trySaveData';
    import { SaveMessageType } from 'types/saveMessageType';
    import { fade } from 'svelte/transition';
    import { loadUserData } from './profileHelper';
    import { censorEmail } from './profileHelper.js';
    import { setFocus } from 'helper/basic';
    import {UserProfileState} from 'types/enums'

    import Tabs from 'elements/navigation/tabs.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import Input from 'elements/input/input.svelte';
    import Button from 'elements/input/button.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import Explanation from 'elements/text/explanation.svelte';



    export let data: LoadDashboard;
    let state: UserProfileState = UserProfileState.None;

    let saveMessage: SaveMessage;
    let errorList: string[] = [];

    let name: string         = '';
    let mail: string         = '';
    let newPassword1: string = '';
    let newPassword2: string = '';
    let oldPassword: string  = '';

    function changeState(value: UserProfileState) {
        const focus = () => {
            setTimeout(() => {
                switch (state) {
                    case UserProfileState.None:
                        console.error('State \'None\' while trying to set the state');
                        return;
                    case UserProfileState.Mail:
                        setFocus('dashboard-user-profile-input-mail-password');
                        return;
                    case UserProfileState.Password:
                        setFocus('dashboard-user-profile-input-password-old');
                        return;
                    case UserProfileState.Name:
                        setFocus('dashboard-user-profile-input-username-password');
                        return;
                }
            }, 10);
        };

        if (state === UserProfileState.None) {
            state = value;
            focus();
            return;
        }

        state = UserProfileState.None;
        setTimeout(() => {
            state = value;
            focus();
        }, 300);
    }

    async function save<T>(toSave: T, url: string): Promise<SaveResult> {
        const response = await trySaveDataAsync(fetch, toSave, url, 'PUT');

        saveMessage.setSaveMessage(response.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = response.messages;

        if (response.success) {
            oldPassword = '';
            changeState(UserProfileState.None);
        }

        return response;
    }

    async function saveName(): Promise<void> {
        const toSave = {
            username: name.trim(),
            password: oldPassword.trim(),
        };

        const response = await save(toSave, '/account/change-username');

        if (response.success) {
            name       = '';
            data.roles = await loadUserData(fetch);
        }
    }

    async function saveMail(): Promise<void> {
        const toSave = {
            email:    mail.trim(),
            password: oldPassword.trim(),
        };

        const response = await save(toSave, '/account/change-email');

        if (response.success) {
            mail      = '';
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

        const response = await save(toSave, '/account/change-password');

        if (response.success) {
            newPassword1 = '';
            newPassword2 = '';
            // no fetch of user data because the password does not get displayed anyway.
        }
    }
</script>

<Tabs classes="subpage-navigation-tabs"
      position="center"
      entries={Menu.user}
      entryName={MenuItem.userProfile.name} />
<SectionDashboard classes="standard-dashboard-section">
    <Explanation>
        Bearbeite hier dein Profil. Dein Name und deine E-Mail-Adresse sind nur für Administratoren sichtbar und werden
        nicht öffentlich angezeigt. Die öffentlich sichtbaren Daten für Speaker werden in einem separaten Bereich
        verwaltet, der erst zugänglich ist, wenn du dich erfolgreich als Speaker beworben hast.
        <br /><br />
        Nutze die Buttons unten, um deine Profildaten zu ändern. Dein Password speichern wir nur in Form eines Hashes
        ab.
    </Explanation>

    <div class="dashboard-user-profile-section-wrapper form-border">
        <div class="dashboard-user-profile-section-entry-wrapper">
            <div class="dashboard-user-profile-entry-grid">
                <TextLine classes="text-align-right">Anmeldename:</TextLine>
                <TextLine>{data.roles.username}</TextLine>
                <TextLine classes="text-align-right">E-Mail-Adresse:</TextLine>
                <TextLine>{censorEmail(data.roles.email)}</TextLine>
            </div>
            <div class="dashboard-user-profile-button-wrapper">
                <Button ariaLabel="Klicke, um deinen Namen zu ändern."
                        on:click={() => {changeState(UserProfileState.Name)}}>Anmeldename ändern
                </Button>
                <Button ariaLabel="Klicke, um deine E-Mail zu ändern."
                        on:click={() => {changeState(UserProfileState.Mail)}}>E-Mail-Adresse ändern
                </Button>
                <Button ariaLabel="Klicke, um dein Passwort zu ändern."
                        on:click={() => {changeState(UserProfileState.Password)}}>Passwort ändern
                </Button>
            </div>
        </div>
    </div>
    <SaveMessage bind:this={saveMessage} />
    <MessageWrapper messages={errorList} />
    {#if state === UserProfileState.Name}
        <div class="dashboard-user-profile-transition-wrapper"
             transition:fade={{ duration: 300 }}>
            <div class="dashboard-user-profile-section-wrapper form-border">
                <form class="dashboard-user-profile-section-entry-wrapper"
                      on:submit|preventDefault={saveName}>
                    <SubHeadline classes="sub-headline-center">Anmeldename</SubHeadline>
                    <Input id="dashboard-user-profile-input-username-password"
                           labelText="Passwort:"
                           ariaLabel="Trage hier dein Passwort ein"
                           type="password"
                           bind:value={oldPassword}
                           on:input={setUnsavedChanges} />
                    <Input id="dashboard-user-profile-input-username"
                           labelText="Neuer Anmeldename:"
                           ariaLabel="Trage hier deinen neuen Anmeldenamen ein"
                           bind:value={name}
                           on:input={setUnsavedChanges} />
                    <div class="dashboard-user-profile-button-wrapper">
                        <Button type="submit"
                                ariaLabel="Klicke, um deinen neuen Namen zu speichern">Speichern
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    {:else if state === UserProfileState.Mail}
        <div class="dashboard-user-profile-transition-wrapper"
             transition:fade={{ duration: 300 }}>
            <div class="dashboard-user-profile-section-wrapper form-border">
                <form class="dashboard-user-profile-section-entry-wrapper"
                      on:submit|preventDefault={saveMail}>
                    <SubHeadline classes="sub-headline-center">E-Mail</SubHeadline>
                    <Input id="dashboard-user-profile-input-mail-password"
                           labelText="Passwort:"
                           ariaLabel="Trage hier dein Passwort ein"
                           type="password"
                           bind:value={oldPassword}
                           on:input={setUnsavedChanges} />
                    <Input id="dashboard-user-profile-input-mail"
                           labelText="Neue E-Mail-Adresse:"
                           ariaLabel="Trage hier deine neue E-Mail-Adresse ein"
                           bind:value={mail}
                           on:input={setUnsavedChanges} />
                    <div class="dashboard-user-profile-button-wrapper">
                        <Button type="submit"
                                ariaLabel="Klicke, um deine neue E-Mail-Adresse zu speichern">Speichern
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    {:else if state === UserProfileState.Password}
        <div class="dashboard-user-profile-transition-wrapper"
             transition:fade={{ duration: 300 }}>
            <div class="dashboard-user-profile-section-wrapper form-border">
                <form class="dashboard-user-profile-section-entry-wrapper"
                      on:submit|preventDefault={savePassword}>
                    <SubHeadline classes="sub-headline-center">Passwort</SubHeadline>
                    <Input id="dashboard-user-profile-input-password-old"
                           labelText="Altes Passwort:"
                           ariaLabel="Trage hier dein altes Passwort ein"
                           type="password"
                           bind:value={oldPassword}
                           on:input={setUnsavedChanges} />
                    <Input id="dashboard-user-profile-input-password-new-1"
                           labelText="Neues Passwort:"
                           ariaLabel="Trage hier dein neues Passwort ein"
                           type="password"
                           bind:value={newPassword1}
                           on:input={setUnsavedChanges} />
                    <Input id="dashboard-user-profile-input-password-new-2"
                           labelText="Wiederholung neues Passwort:"
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
            </div>
        </div>
    {/if}
</SectionDashboard>


<style>
    .dashboard-user-profile-section-wrapper {
        width:         100%;
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
    }

    .dashboard-user-profile-button-wrapper {
        display:         flex;
        flex-direction:  row;
        justify-content: center;
        gap:             var(--2x-gap);
        margin-top:      var(--2x-margin);
    }
</style>
