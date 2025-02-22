<script lang="ts">
    import * as Menu from 'menu/contact';

    import type { LoadContact } from 'types/loadTypes';

    import { setUnsavedChanges } from 'stores/saved';

    import PageWrapper from 'elements/section/pageWrapper.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import HeadlinePage from 'elements/text/headlinePage.svelte';
    import Input from 'elements/input/input.svelte';
    import DropDown from 'elements/input/dropDown.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';

    enum State {
        Default,
        EmailSend,
    }

    const subjectOther: string  = 'Sonstiges';
    const subjectData: string[] = [
        subjectOther,
        'Vortrag',
        'sponsoring',
    ];

    let state                   = State.Default;
    let name: string            = '';
    let mail: string            = '';
    let subject: string         = '';
    let subjectConcrete: string = '';
    let message: string         = '';

    export let data: LoadContact;

    async function save(): Promise<boolean> {
        return false;
    }
</script>

<PageWrapper globals={data.globals}
             headerMenu={data.loggedIn ? Menu.headerIn : Menu.headerOut}
             footerMenu={data.loggedIn ? Menu.footerIn : Menu.footerOut}
>
    <SectionDashboard classes="standard-dashboard-section">
        <HeadlinePage>Kontakt</HeadlinePage>
        {#if state === State.Default}
            <form class="contact-form"
                  on:submit|preventDefault={save}>
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
                              labelText="Betreff:"
                              data={subjectData}
                              bind:selected={subject} />
                    {#if subject === subjectOther}
                        <Input id="contact-subject-concrete-input"
                               labelText="Betreff:"
                               placeholderText="Betreff"
                               ariaLabel="Spezifiziere hier dein Betreff"
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
                          on:submit={save} />
            </form>
        {:else if state === State.EmailSend}
            <TextLine>State: {state}</TextLine>
        {:else}
            <TextLine>State: {state}</TextLine>
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
