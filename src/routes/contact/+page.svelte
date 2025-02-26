<script lang="ts">
    import * as Menu from 'menu/contact';

    import type { LoadContact } from 'types/loadTypes';

    import { resetUnsavedChanges, setUnsavedChanges, unsavedChanges } from 'stores/saved';
    import { trySaveDataAsync } from 'helper/trySaveData.js';
    import { SaveMessageType } from 'types/saveMessageType';
    import { onMount } from 'svelte';
    import { scrollToTop } from 'helper/scroll';
    import { z } from 'zod';

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

    enum State {
        Default,
        EmailSent,
    }

    const subjectOther: string  = 'Sonstiges';
    const subjectData: string[] = [
        'Vortrag',
        'sponsoring',
        subjectOther,
    ];

    let state                   = State.Default;
    let name: string            = '';
    let mail: string            = '';
    let subject: string         = subjectData[0];
    let subjectConcrete: string = '';
    let message: string         = '';

    let saveMessage: SaveMessage;
    let errorList: string[] = [];

    export let data: LoadContact;

    onMount(() => {
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
        const mailScheme = z.string().email();
        if (mailScheme.safeParse(mail)) {
            errorList.push(`'${mail}' ist keine valide E-Mail`);
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
            'name':    name.trim(),
            'email':   mail.trim(),
            'subject': subject === subjectOther ? subjectConcrete.trim() : subject,
            'message': message.trim(),
        };

        const result = await trySaveDataAsync(fetch, saveData, '/api/contact', 'POST');

        saveMessage.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = result.messages;

        if (result.success) {
            state           = State.EmailSent;
            name            = '';
            mail            = '';
            subjectConcrete = '';
            message         = '';
        }

        return result.success;
    }
</script>

<UnsavedChangesPopup />
<UnsavedChangesCallbackWrapper callback={saveAsync} />

<PageWrapper globals={data.globals}
             headerMenu={data.loggedIn ? Menu.headerIn : Menu.headerOut}
             footerMenu={data.loggedIn ? Menu.footerIn : Menu.footerOut}
>
    <SectionDashboard classes="standard-dashboard-section">
        <HeadlinePage>Kontakt</HeadlinePage>
        <SaveMessage bind:this={saveMessage} />
        <MessageWrapper messages={errorList} />
        {#if state === State.Default}
            <form class="contact-form"
                  on:submit|preventDefault={saveAsync}>
                <Input id="contact-name-input"
                       labelText="Name:"
                       placeholderText="Name"
                       ariaLabel="Gib hier deinen Namen ein"
                       bind:value={name}
                       on:input={setUnsavedChanges} />
                <Input id="contact-mail-input"
                       labelText="E-Mail:"
                       placeholderText="E-Mail"
                       ariaLabel="Gib hier deine E-mail ein"
                       bind:value={mail}
                       on:input={setUnsavedChanges} />
                <div class="contact-subject-wrapper">
                    <DropDown id="contact-subject-dropdown"
                              labelText="Was gibts?"
                              data={subjectData}
                              bind:selected={subject} />
                    {#if subject === subjectOther}
                        <Input id="contact-subject-concrete-input"
                               labelText="Betreff:"
                               placeholderText="Betreff"
                               ariaLabel="Spezifiziere hier den Betreff"
                               limit={78}
                               bind:value={subjectConcrete}
                               on:input={setUnsavedChanges} />
                    {/if}
                </div>
                <TextArea id="contact-message-text-area"
                          labelText="Nachricht:"
                          placeholderText="Nachricht"
                          ariaLabel="Gib hier deine Nachricht ein"
                          rows={25}
                          limit={2000}
                          bind:value={message}
                          on:input={setUnsavedChanges}
                          on:submit={saveAsync} />
                <Button type="submit"
                        ariaLabel="Klicke, um die Mail zu verschicken"
                        classes="center-button">Senden
                </Button>
            </form>
        {:else if state === State.EmailSent}
            <TextLine classes="text-line-center">Deine Nachricht wurde erfolgreich verschickt.</TextLine>
            <TextLine classes="text-line-center">Wir werden uns in nächster Zeit bei dir melden.</TextLine>
        {:else}
            <TextLine classes="text-line-center">👻 Upsi. Dieses Seite ist kaputt. 👻</TextLine>
        {/if}
    </SectionDashboard>
</PageWrapper>

<style>
    .contact-form {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }

    .contact-subject-wrapper {
        display:        flex;
        flex-direction: row;
        gap:            var(--full-gap);
    }
</style>
