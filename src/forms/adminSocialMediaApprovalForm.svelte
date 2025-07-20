<script lang="ts">
    import {type DashboardApprovalSocialMediaLink} from 'types/dashboardProvideTypes';

    import {setUnsavedChanges} from 'stores/saved';
    import {createEventDispatcher} from 'svelte';
    import {trySaveDataAsync} from 'helper/trySaveData';
    import {SaveMessageType} from 'types/saveMessageType';
    import {scrollToAnchor} from 'helper/scroll';

    import TextLine from 'elements/text/textLine.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import Button from 'elements/input/button.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import StyledLink from 'elements/input/styledLink.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';
    import GeneralPopup from 'elements/popups/generalPopup.svelte';

    export let media: DashboardApprovalSocialMediaLink;

    let message: SaveMessage;
    let errorList: string[] = [];

    let approvalPopup: GeneralPopup;
    const dispatch = createEventDispatcher();

    function validateRequestedChanges(): boolean {
        errorList = [];

        if (media.requested_changes.trim().length === 0) {
            errorList.push('Keine Änderungswünsche eingetragen');
        }

        return errorList.length === 0;
    }

    async function requestChanges(): Promise<void> {
        scrollToAnchor(`social-media-approval-entry-${media.id}`);

        if (!validateRequestedChanges()) {
            return;
        }

        const toSave = {message: media.requested_changes};
        const route: string = `/dashboard/admin/approval/social-media-link/${media.id}/request-changes`;
        const response = await trySaveDataAsync(fetch, toSave, route, 'PUT');

        message.setSaveMessage(response.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = response.messages;
        dispatch('changes');
    }

    function validateApprove(): boolean {
        errorList = [];

        if (media.requested_changes.trim().length !== 0) {
            errorList.push('Ein Eintrag mit Änderungswünschen kann nicht freigegeben werden');
        }

        return errorList.length === 0;
    }

    async function approve(): Promise<void> {
        scrollToAnchor(`social-media-approval-entry-${media.id}`);

        if (!validateApprove()) {
            return;
        }

        const route: string = `/dashboard/admin/approval/social-media-link/${media.id}`;
        const response = await trySaveDataAsync(fetch, [], route, 'PUT');

        message.setSaveMessage(response.success ? SaveMessageType.Approved : SaveMessageType.Error);
        errorList = response.messages;
        dispatch('approved');
    }
</script>

<GeneralPopup bind:this={approvalPopup}
              headline="Eintrag Freigeben?"
              text="Wenn du '{media.url}' freigibst kannst du dies nicht mehr rückgängig machen."
              denyButtonText="Abbrechen"
              acceptButtonText="Freigeben"
              denyCallback={() => {}}
              acceptCallback={approve}
/>

<div class="social-media-approval-wrapper form-border"
     id="social-media-approval-entry-{media.id}">
    <SaveMessage bind:this={message}/>
    <MessageWrapper messages={errorList}/>
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
                on:click={() => {approvalPopup.show('')}}
        >Freigeben
        </Button>
    </div>
</div>

<style>
    .social-media-approval-wrapper {
        scroll-margin-top: var(--16x-margin);
    }

    .dashboard-admin-approval-grid {
        display: flex;
        gap: var(--full-gap);
        justify-self: center;
        margin: var(--2x-margin) 0;
    }

    :global(.dashboard-admin-approval-social-media-text) {
        align-self: center;
    }

    .dashboard-admin-approval-button-array {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: var(--full-gap);
        margin: var(--full-margin);
    }
</style>
