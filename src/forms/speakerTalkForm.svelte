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

    export let classes: string  = '';
    export let data: DashboardPendingTalk;
    export let tags: AllTalkTag;
    export let talkDurations: DashboardTalkDurationChoices;
    export let useForm: boolean = true;

    // @formatter:off
    let saveMessage: SaveMessage;
    let errorList:   string[]     = [];
    let dispatcher                = createEventDispatcher();
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
    <SubHeadline classes="sub-headline-center">{data.id === 0 ? "neuer Talk" : data.title}</SubHeadline>
    <SaveMessage bind:this={saveMessage} />
    <MessageWrapper messages={errorList} />

    {#if data.requested_changes}
        <Message classes="message-pre-wrap"
                 message={`Änderungswünsche:\n${data.requested_changes}`} />
    {/if}
    <Input id="dashboard-speaker-talk-input-title"
           labelText="Titel:"
           placeholderText="Titel"
           ariaLabel="Gib hier den Titel des Talks ein"
           bind:value={data.title}
           on:input={setUnsavedChanges} />
    <TextArea id="dashboard-speaker-talk-input-description"
              labelText="Beschreibung:"
              placeholderText="Beschreibung"
              ariaLabel="Gib hier die Beschreibung des Talks ein"
              bind:value={data.description}
              on:input={setUnsavedChanges}
              on:submit={save} />
    <TagArray labelText="Tags:"
              data={tags}
              bind:selected={data.tags}
              on:toggle={setUnsavedChanges} />
    <DurationArray labelText="Vortragslänge in Minuten:"
                   data={talkDurations}
                   bind:selected={data.possible_durations}
                   on:toggle={setUnsavedChanges} />
    <TextArea id="dashboard-speaker-talk-input-notes"
              labelText="Anmerkungen:"
              placeholderText="Anmerkungen"
              ariaLabel="Gib hier Anmerkungen zum Talk ein."
              bind:value={data.notes}
              on:input={setUnsavedChanges}
              on:submit={save} />
    {#if useForm}
        <div class="dashboard-speaker-talk-button-wrapper">
            <Button type="submit"
                    ariaLabel="Klicke, um den Talk zu speichern">Speichern
            </Button>
        </div>
    {/if}
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

    .dashboard-speaker-talk-button-wrapper {
        display:        flex;
        flex-direction: row;
        margin:         var(--2x-margin) auto 0;
        gap:            var(--full-gap);
    }
</style>
