<script lang="ts">
    import type { DashboardApprovalSocialMediaLink } from 'types/dashboardProvideTypes';

    import { setUnsavedChanges } from 'stores/saved';

    import TextLine from 'elements/text/textLine.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import Button from 'elements/input/button.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import StyledLink from 'elements/input/styledLink.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';

    export let media: DashboardApprovalSocialMediaLink;

    let message: SaveMessage;
    let errorList: string[] = [];

    async function requestChanges() {
    }

    async function approve() {
    }
</script>

<SaveMessage bind:this={message} />
<MessageWrapper messages={errorList} />
<div class="social-media-approval-wrapper">
    <div class="dashboard-admin-approval-grid">
        <StyledLink
              icon={media.name}
              href={media.url}
              title={`${media.name} Link von ${media.account.username}`}
              text={media.name}
        />
        <TextLine classes="dashboard-admin-approval-social-media-text">{media.url}</TextLine>
    </div>
    <TextArea
          rows={5}
          id={'dashboard-admin-approval-social-media-changes-' + media.id}
          ariaLabel="Trage hier die Änderungswünsche den aktuellen Datensatzes ein."
          labelText="Änderungswünsche:"
          bind:value={media.requested_changes}
          on:submit={requestChanges}
          on:input={setUnsavedChanges}
    />
    <div class="dashboard-admin-approval-button-array">
        <Button
              ariaLabel="Klicke hier, um Änderungswünsche zu stellen"
              on:click={requestChanges}
        >Änderungswünsche
        </Button>
        <Button
              ariaLabel="Klicke hier, um den Datensatz freizugeben"
              on:click={approve}
        >Freigeben
        </Button>
    </div>
</div>

<style>
    .social-media-approval-wrapper{
        border: 1px solid var(--primary-color-dark);
        border-radius: var(--border-radius);
        padding: var(--full-padding);
    }
    .dashboard-admin-approval-grid {
        display:      flex;
        gap:          var(--full-gap);
        justify-self: center;
        margin:       var(--2x-margin) 0;
    }

    .dashboard-admin-approval-button-array {
        display:         flex;
        flex-direction:  row;
        justify-content: center;
        gap:             var(--full-gap);
        margin:          var(--full-margin);
    }
</style>
