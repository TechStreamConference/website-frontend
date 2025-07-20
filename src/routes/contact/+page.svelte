<script lang="ts">
    import * as Menu from 'menu/page';

    import type {LoadContact} from 'types/loadTypes';

    import {resetUnsavedChanges, setUnsavedChanges, unsavedChanges} from 'stores/saved';
    import {trySaveDataAsync} from 'helper/trySaveData.js';
    import {SaveMessageType} from 'types/saveMessageType';
    import {onMount} from 'svelte';
    import {scrollToTop} from 'helper/scroll';
    import {setFocus} from 'helper/basic';
    import {z} from 'zod';
    import {SingleProcessState} from 'types/enums'

    import PageWrapper from 'elements/section/pageWrapper.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import HeadlinePage from 'elements/text/headlinePage.svelte';
    import Input from 'elements/input/input.svelte';
    import DropDown from 'elements/input/dropDown.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import Button from 'elements/input/button.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import UnsavedChangesPopup from 'elements/popups/unsavedChangesPopup.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';

    const subjectOther: string = 'Sonstiges';
    const subjectData: string[] = [
        'Vortrag',
        'sponsoring',
        subjectOther,
    ];

    let state = SingleProcessState.Default;
    let name: string = '';
    let mail: string = '';
    let subject: string = subjectData[0];
    let subjectConcrete: string = '';
    let message: string = '';

    let saveMessage: SaveMessage;
    let errorList: string[] = [];

    export let data: LoadContact;

    onMount(() => {
        setFocus('contact-name-input');
        resetUnsavedChanges();
        window.addEventListener('beforeunload', (event) => {
            if (unsavedChanges()) {
                event.preventDefault();
            }
        });
    });

    function validate(): boolean {
        errorList = [];
        if (name.trim().length === 0) {
            errorList.push('Bitte gib einen Namen ein.');
        }

        if (mail.trim().length === 0) {
            errorList.push('Bitte gib eine E-Mail ein.');
        }
        const validatedMail = z.string().email().safeParse(mail);
        if (!validatedMail.success) {
            errorList.push(`'${mail}' ist keine valide E-Mail.`);
        }

        if (subject === subjectOther && subjectConcrete.trim().length === 0) {
            errorList.push('Bitte gib einen konkreten Betreff ein');
        }

        if (message.trim().length === 0) {
            errorList.push('Bitte gibt eine Nachricht ein.');
        }

        return errorList.length === 0;
    }

    async function saveAsync(): Promise<boolean> {
        scrollToTop();

        if (!validate()) {
            saveMessage.setSaveMessage(SaveMessageType.Error);
            return false;
        }

        const saveData = {
            'name': name.trim(),
            'email': mail.trim(),
            'subject': subject === subjectOther ? subjectConcrete.trim() : subject,
            'message': message.trim(),
        };

        const result = await trySaveDataAsync(fetch, saveData, '/contact', 'POST');

        saveMessage.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = result.messages;

        if (result.success) {
            state = SingleProcessState.Success;
            name = '';
            mail = '';
            subjectConcrete = '';
            message = '';
        }

        return result.success;
    }
</script>

<UnsavedChangesPopup/>
<UnsavedChangesCallbackWrapper callback={saveAsync}/>

<PageWrapper globals={data.globals}
             headerMenu={data.loggedIn ? Menu.headerLoggedIn : Menu.headerLoggedOut}
             footerMenu={data.loggedIn ? Menu.footerLoggedIn : Menu.footerLoggedOut}
>
    <SectionDashboard classes="standard-dashboard-section">
        <HeadlinePage>Kontakt</HeadlinePage>
        <SaveMessage bind:this={saveMessage}/>
        <MessageWrapper messages={errorList}/>
        {#if state === SingleProcessState.Default}
            <form class="contact-form"
                  on:submit|preventDefault={saveAsync}>
                <Input id="contact-name-input"
                       labelText="Name:"
                       placeholderText="Name"
                       ariaLabel="Gib hier deinen Namen ein"
                       bind:value={name}
                       on:input={setUnsavedChanges}/>
                <Input id="contact-mail-input"
                       labelText="E-Mail:"
                       placeholderText="E-Mail"
                       ariaLabel="Gib hier deine E-mail ein"
                       bind:value={mail}
                       on:input={setUnsavedChanges}/>
                <div class="contact-subject-wrapper">
                    <DropDown id="contact-subject-dropdown"
                              labelText="Was gibt's?"
                              data={subjectData}
                              bind:selected={subject}/>
                    {#if subject === subjectOther}
                        <Input id="contact-subject-concrete-input"
                               labelText="Betreff:"
                               placeholderText="Betreff"
                               ariaLabel="Spezifiziere hier den Betreff"
                               limit={78}
                               bind:value={subjectConcrete}
                               on:input={setUnsavedChanges}/>
                    {/if}
                </div>
                <TextArea id="contact-message-text-area"
                          labelText="Nachricht:"
                          placeholderText="Nachricht"
                          ariaLabel="Gib hier deine Nachricht ein"
                          rows={15}
                          limit={2000}
                          bind:value={message}
                          on:input={setUnsavedChanges}
                          on:submit={saveAsync}/>
                <Button type="submit"
                        ariaLabel="Klicke, um die Mail zu verschicken"
                        classes="center-button">Senden
                </Button>
            </form>
        {:else if state === SingleProcessState.Success}
            <TextLine classes="text-line-center">Deine Nachricht wurde erfolgreich verschickt.</TextLine>
            <TextLine classes="text-line-center">Wir werden uns in nächster Zeit bei dir melden.</TextLine>
        {:else}
            <TextLine classes="text-line-center">👻 Upsi. Dieses Seite ist kaputt. 👻</TextLine>
        {/if}
    </SectionDashboard>
</PageWrapper>

<style>
    .contact-form {
        display: flex;
        flex-direction: column;
        gap: var(--full-gap);
    }

    .contact-subject-wrapper {
        display: flex;
        flex-direction: row;
        gap: var(--full-gap);
    }
</style>
