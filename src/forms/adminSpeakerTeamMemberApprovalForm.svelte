<script lang="ts">

    import type { DashboardApprovalSpeakerTeamMember } from 'types/dashboardProvideTypes';

    import { imageUrl } from 'helper/links';
    import { setUnsavedChanges } from 'stores/saved';

    import TextLine from 'elements/text/textLine.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import Button from 'elements/input/button.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import Message from 'elements/text/message.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import Image from 'elements/image/image.svelte';

    export let speakerTeamMember: DashboardApprovalSpeakerTeamMember;
    export let type: 'speaker' | 'team-member';

    let message: SaveMessage;
    let errorList: string[] = [];

    export function getBackgroundClass(diff: string[] | null, reference: string): string {
        if (!diff) {
            return '';
        }
        return diff.includes(reference) ? 'dashboard-admin-approval-has-changed-background text-line-white' : '';
    }

    async function approve(): Promise<void> {

    }

    async function reject(): Promise<void> {

    }

    async function requestChanges(): Promise<void> {

    }
</script>

<div class="speaker-team-member-wrapper">
    {#if speakerTeamMember.diff === null || speakerTeamMember.diff.length === 0}
        <Message color="success"
                 message="Bewerbung"></Message>
    {/if}
    <SaveMessage bind:this={message} />
    <MessageWrapper messages={errorList} />
    <div class="dashboard-admin-approval-grid">
        <TextLine>Event:</TextLine>
        <TextLine>{speakerTeamMember.event.title}</TextLine>
        <TextLine classes={getBackgroundClass(speakerTeamMember.diff, 'name')}>Name:</TextLine>
        <TextLine classes={getBackgroundClass(speakerTeamMember.diff, 'name')}>{speakerTeamMember.name}</TextLine>
        <TextLine classes={getBackgroundClass(speakerTeamMember.diff, 'short_bio')}
        >Kurzbeschreibung:
        </TextLine>
        <TextLine classes={getBackgroundClass(speakerTeamMember.diff, 'short_bio')}
        >{speakerTeamMember.short_bio}</TextLine>
        <TextLine classes={getBackgroundClass(speakerTeamMember.diff, 'bio')}>Beschreibung:</TextLine>
        <Paragraph classes="{getBackgroundClass(speakerTeamMember.diff, 'bio')} paragraph-pre-wrap"
        >{speakerTeamMember.bio}</Paragraph>
        <TextLine classes={getBackgroundClass(speakerTeamMember.diff, 'photo')}>Foto:</TextLine>
        <Image
              classes={getBackgroundClass(speakerTeamMember.diff, 'photo')}
              alt={'Speaker-Bild von ' + speakerTeamMember.name}
              src={imageUrl(speakerTeamMember.photo)}
        />
    </div>
    <TextArea
          rows={5}
          id={'dashboard-admin-approval-speaker-changes-' + speakerTeamMember.id}
          ariaLabel="Trage hier die Änderungswünsche den aktuellen Datensatzes ein."
          labelText="Änderungswünsche:"
          bind:value={speakerTeamMember.requested_changes}
          on:submit={requestChanges}
          on:input={setUnsavedChanges}
    />
    <div class="dashboard-admin-approval-button-array">
        <Button
              ariaLabel="Klicke hier, um Änderungswünsche zu stellen"
              on:click={requestChanges}
        >Änderungswünsche
        </Button>
        {#if speakerTeamMember.can_reject}
            <Button
                  ariaLabel="Klicke hier, um den Speaker abzulehnen"
                  on:click={reject}
            >Ablehnen
            </Button>
        {/if}
        <Button
              ariaLabel="Klicke hier, um den Datensatz freizugeben"
              on:click={approve}
        >Freigeben
        </Button>
    </div>
</div>

<style>
    :global(.dashboard-admin-approval-has-changed-background) {
        background-color: var(--primary-color-dark);
        border-radius:    var(--border-radius);
        padding:          var(--half-padding);
    }

    .dashboard-admin-approval-grid {
        justify-self:          center;
        display:               grid;
        grid-template-columns: 20rem 1fr;
        gap:                   var(--quad-gap);
        margin:                var(--2x-margin) 0;
    }

    .speaker-team-member-wrapper {
        border:        1px solid var(--primary-color-dark);
        border-radius: var(--border-radius);
        padding:       var(--full-padding);
    }

    .dashboard-admin-approval-button-array {
        display:         flex;
        flex-direction:  row;
        justify-content: center;
        gap:             var(--full-gap);
        margin:          var(--full-margin);
    }
</style>
