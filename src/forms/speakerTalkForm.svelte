<script lang="ts">
    import type { DashboardPendingTalk, DashboardTalkDurationChoices } from 'types/dashboardProvideTypes';
    import type { SetTalk } from 'types/dashboardSetTypes';
    import type { AllTalkTag } from 'types/provideTypes';

    import { setUnsavedChanges } from 'stores/saved';
    import { scrollToAnchor } from 'helper/scroll';
    import { trySaveDataAsync } from 'helper/trySaveData';
    import { SaveMessageType } from 'types/saveMessageType';
    import { createEventDispatcher } from 'svelte';

    import TagArray from 'elements/input/tagArray.svelte';
    import Message from 'elements/text/message.svelte';
    import Input from 'elements/input/input.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import Button from 'elements/input/button.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import DurationArray from 'elements/input/durationArray.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import FormWrapper from 'elements/wrapper/formWrapper.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';

    export let classes: string  = '';
    export let data: DashboardPendingTalk;
    export let tags: AllTalkTag;
    export let talkDurations: DashboardTalkDurationChoices;
    export let useForm: boolean = true;

    // @formatter:off
    let saveMessage: SaveMessage;
    let errorList: string[] = [];
    let dispatcher = createEventDispatcher();
    // @formatter:on

    async function save(): Promise<boolean> {
        scrollToAnchor(`dashboard-speaker-talk-form-${data.id}`);

        const toSave: SetTalk = {
            title:              data.title,
            description:        data.description,
            notes:              data.notes,
            possible_durations: data.possible_durations,
            tag_ids:            data.tags.map(x => x.id),
        };

        const result = await (async () => {
            if (data.id === 0) {
                return await trySaveDataAsync(fetch, toSave, `/dashboard/speaker/submit-talk`, 'POST');
            }
            return await trySaveDataAsync(fetch, toSave, `/dashboard/speaker/talk/${data.id}`, 'PUT');
        })();

        saveMessage.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = result.messages;
        if (result.success) {
            data.requested_changes = '';
            dispatcher('save');
        }
        return result.success;
    }

</script>

<FormWrapper classes="dashboard-speaker-talk-form {classes}"
             submitCallback={save}
             {useForm}>
    <SubHeadline classes="sub-headline-center">{data.id === 0 ? "Neuer Talk" : data.title}</SubHeadline>
    <SaveMessage bind:this={saveMessage} />
    <MessageWrapper messages={errorList} />

    {#if data.requested_changes}
        <Message classes="message-pre-wrap"
                 message={`Änderungswünsche:\n${data.requested_changes}`} />
    {/if}
    <div class="input-grid">
        <Input id="dashboard-speaker-talk-input-title"
               labelText="Titel:"
               placeholderText="Titel"
               ariaLabel="Gib hier den Titel des Talks ein"
               bind:value={data.title}
               on:input={setUnsavedChanges} />
        <Paragraph classes="paragraph-gray">Gibt deinem Vortrag einen Titel. Er sollte kurz, aber auch spannend sein,
                                            sodass er „Lust auf mehr” macht, ohne zu viel zu verraten.
        </Paragraph>
        <div class="grid-line" />
        <TextArea id="dashboard-speaker-talk-input-description"
                  labelText="Beschreibung:"
                  placeholderText="Beschreibung"
                  ariaLabel="Gib hier die Beschreibung des Talks ein"
                  bind:value={data.description}
                  on:input={setUnsavedChanges}
                  on:submit={save} />
        <Paragraph classes="paragraph-gray">Beschreibe deinen Vortrag. Hier darfst du gerne etwas mehr ins Detail gehen.
                                            Worum geht es in deinem Vortrag? Was wird man dabei lernen? Was ist das
                                            Besondere an deinem Vortrag? Eine
                                            Länge von ca. 30 bis 50 Wörtern ist ideal.
        </Paragraph>
        <div class="grid-line" />
        <TagArray labelText="Tags:"
                  data={tags}
                  bind:selected={data.tags}
                  on:toggle={setUnsavedChanges} />
        <Paragraph classes="paragraph-gray">Wähle durch Anklicken #Tags aus, die am besten zu deinem Vortrag passen. Du
                                            musst mindestens einen Tag auswählen. Sollten sehr viele Tags passend sein,
                                            beschränke dich am besten auf
                                            die drei wichtigsten.
        </Paragraph>
        <div class="grid-line" />
        <DurationArray labelText="Vortragslänge in Minuten:"
                       data={talkDurations}
                       bind:selected={data.possible_durations}
                       on:toggle={setUnsavedChanges} />
        <Paragraph classes="paragraph-gray">Wir müssen wissen, wie lang dein Vortrag dauert, um damit später den Ablauf
                                            des Events planen zu können. Wähle durch Anklicken die möglichen Längen für
                                            deinen Vortrag aus. Je mehr du
                                            auswählst, umso flexibler können wir planen.<br />
                                            Teil deines Vortrags ist auch eine Fragerunde mit Fragen der Community.
                                            Plane hierfür 5 bis 15 Minuten ein,
                                            die in der Vortragsdauer enthalten sein sollten. Bei sehr kurzen Vorträgen (<i>„Lightning-Talks”</i>)
                                            entfällt die Fragerunde.
        </Paragraph>
        <div class="grid-line" />
        <TextArea id="dashboard-speaker-talk-input-notes"
                  labelText="Anmerkungen:"
                  placeholderText="Anmerkungen"
                  ariaLabel="Gib hier Anmerkungen zum Talk ein."
                  bind:value={data.notes}
                  on:input={setUnsavedChanges}
                  on:submit={save} />
        <Paragraph classes="paragraph-gray">Du hast nur am ersten Tag des Events Zeit, um deinen Vortrag zu halten? Du
                                            kannst deinen Vortrag nicht live halten, sondern nur als Aufzeichnung
                                            bereitstellen? Dein Vortrag ist Teil
                                            einer Vortragsreihe, bei der die restlichen Vorträge von anderen Personen
                                            eingereicht werden? Dein Vortrag
                                            hat bestimmte technische Voraussetzungen, die wir im Vorfeld besprechen
                                            müssen? Teile uns solche Dinge in
                                            diesem Feld mit, damit wir besser planen können.
        </Paragraph>
        {#if useForm}
            <div class="grid-line" />
            <div class="dashboard-speaker-talk-button-wrapper">
                <Button type="submit"
                        ariaLabel="Klicke, um den Talk zu speichern">Speichern
                </Button>
            </div>
        {/if}
    </div>
</FormWrapper>

<style>
    :global(.dashboard-speaker-talk-form) {
        display:           flex;
        flex-direction:    column;
        gap:               var(--full-gap);
        scroll-margin-top: var(--16x-margin);
        border:            1px solid var(--primary-color-dark);
        border-radius:     var(--border-radius);
        padding:           var(--full-padding);
    }

    .input-grid {
        display:               grid;
        grid-template-columns: 1fr 1fr;
        gap:                   var(--full-gap);
    }

    .grid-line {
        border-top:  1px solid var(--background-color-light);
        grid-column: 1/3;
    }

    :global(.input-grid > .paragraph-gray) {
        align-self: center;
    }

    .dashboard-speaker-talk-button-wrapper {
        grid-column:    1/3;
        display:        flex;
        flex-direction: row;
        margin:         0 auto;
        gap:            var(--full-gap);
    }
</style>
