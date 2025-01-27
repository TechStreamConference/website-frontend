<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadAdminApproval } from 'types/dashboardLoadTypes';

    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import Button from 'elements/input/button.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import Image from 'elements/image/image.svelte';
    import HeadlineH2 from 'elements/text/headlineH2.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import StyledLink from 'elements/input/styledLink.svelte';
    import Tabs from 'elements/navigation/tabs.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';

    import { apiUrl } from 'helper/links';
    import { scrollToAnchor } from 'helper/scroll';
    import { getBackgroundClass } from './approvalHelper';
    import { SaveMessageType } from 'types/saveMessageType';
    import { setUnsavedChanges } from 'stores/saved';
    import { ApprovalSection, getSectionHash } from 'types/approvalSection';
    import { validateApproval, validateRequestedChanges } from './approvalValidation';
    import { trySaveDataAsync } from 'helper/trySaveData.js';

    export let data: LoadAdminApproval;

    const saveMessages: {
        [key in ApprovalSection]: {
            [key: number]: SaveMessage
        }
    }                                                           = {
        0: {},
        1: {},
        2: {},
    };
    const specificErrors: {
        [key in ApprovalSection]: {
            [key: number]: string[]
        }
    }                                                           = {
        0: {},
        1: {},
        2: {},
    };
    const routePartLookup: { [key in ApprovalSection]: string } = {
        0: 'speaker',
        1: 'team-member',
        2: 'social-media-link',
    };

    async function requestChangesAsync(section: ApprovalSection, id: number, changes: string): Promise<void> {
        const messages: string[]    = validateRequestedChanges(changes);
        specificErrors[section][id] = messages;
        scrollToAnchor(getSectionHash(section, id));

        if (messages.length > 0) {
            return;
        }

        await saveRequestedChangesAsync(section, id, changes);
    }

    async function saveRequestedChangesAsync(section: ApprovalSection, id: number, change: string): Promise<void> {
        const toSave        = { message: change };
        const route: string = `/api/dashboard/admin/approval/${routePartLookup[section]}/${id}/request-changes`;
        const response      = await trySaveDataAsync(fetch, toSave, route, 'PUT');

        saveMessages[section][id].setSaveMessage(response.success ? SaveMessageType.Save : SaveMessageType.Error);
        specificErrors[section][id] = response.messages;
    }

    async function approvalAsync(section: ApprovalSection, id: number, changes: string): Promise<void> {
        const messages: string[]    = validateApproval(changes);
        specificErrors[section][id] = messages;
        scrollToAnchor(getSectionHash(section, id));

        if (messages.length > 0) {
            return;
        }

        const success = await saveApprovalAsync(section, id);
        if (success) {
            deleteEntry(section, id);
        }
    }

    async function saveApprovalAsync(section: ApprovalSection, id: number): Promise<boolean> {
        const route: string = `/api/dashboard/admin/approval/${routePartLookup[section]}/${id}`;
        const response      = await trySaveDataAsync(fetch, [], route, 'PUT');

        saveMessages[section][id].setSaveMessage(response.success ? SaveMessageType.Approved : SaveMessageType.Error);
        specificErrors[section][id] = response.messages;

        return response.success;
    }

    function deleteEntry(section: ApprovalSection, id: number): void {
        setTimeout(() => {
            delete saveMessages[section][id];
            delete specificErrors[section][id];
            // use assignments here because of reactivity
            if (section === ApprovalSection.Speaker) {
                data.speaker = data.speaker.filter((item) => {
                    return item.id !== id;
                });
            } else if (section === ApprovalSection.TeamMember) {
                data.teamMember = data.teamMember.filter((item) => {
                    return item.id !== id;
                });
            } else {
                data.socialMedia = data.socialMedia.filter((item) => {
                    return item.id !== id;
                });
            }
        }, 3005);
    }
</script>

<Tabs
      entries={Menu.admin}
      entryName={MenuItem.adminApproval.name}
      classes="navigation-tabs-dashboard-subpage"
/>
<SectionDashboard classes="dashboard-admin-approval-section">
    <HeadlineH2 classes="dashboard-admin-approval-headline-h2">Speaker</HeadlineH2>
    {#if data.speaker.length > 0}
        {#each data.speaker as speaker}
            <div class="dashboard-admin-approval">
                <SubHeadline
                      id={getSectionHash(ApprovalSection.Speaker, speaker.id)}
                      classes="dashboard-admin-approval-subheading">{speaker.account.username}</SubHeadline
                >
                <SaveMessage bind:this={saveMessages[ApprovalSection.Speaker][speaker.id]} />
                <MessageWrapper messages={specificErrors[ApprovalSection.Speaker][speaker.id]} />
                <div class="dashboard-admin-approval-grid">
                    <TextLine>Event:</TextLine>
                    <TextLine>{speaker.event.title}</TextLine>
                    <TextLine classes={getBackgroundClass(speaker.diff, 'name')}>Name:</TextLine>
                    <TextLine classes={getBackgroundClass(speaker.diff, 'name')}>{speaker.name}</TextLine>
                    <TextLine classes={getBackgroundClass(speaker.diff, 'short_bio')}
                    >Kurzbeschreibung:
                    </TextLine
                    >
                    <TextLine classes={getBackgroundClass(speaker.diff, 'short_bio')}
                    >{speaker.short_bio}</TextLine
                    >
                    <TextLine classes={getBackgroundClass(speaker.diff, 'bio')}>Beschreibung:</TextLine>
                    <Paragraph classes="{getBackgroundClass(speaker.diff, 'bio')} paragraph-pre-wrap"
                    >{speaker.bio}</Paragraph
                    >
                    <TextLine classes={getBackgroundClass(speaker.diff, 'photo')}>Foto:</TextLine>
                    <Image
                          classes={getBackgroundClass(speaker.diff, 'photo')}
                          alt={'Speaker-Bild von ' + speaker.name}
                          src={apiUrl(`/api/${speaker.photo}`)}
                    />
                </div>
                <TextArea
                      rows={5}
                      id={'dashboard-admin-approval-speaker-changes-' + speaker.id}
                      ariaLabel="Trage hier die Änderungswünsche den aktuellen Datensatzes ein."
                      labelText="Änderungswünsche:"
                      bind:value={speaker.requested_changes}
                      on:submit={() =>
						requestChangesAsync(ApprovalSection.Speaker, speaker.id, speaker.requested_changes)}
                      on:input={setUnsavedChanges}
                />
                <div class="dashboard-admin-approval-button-array">
                    <Button
                          ariaLabel="Klicke hier, um Änderungswünsche zu stellen"
                          on:click={() =>
							requestChangesAsync(ApprovalSection.Speaker, speaker.id, speaker.requested_changes)}
                    >Änderungswünsche
                    </Button
                    >
                    <Button
                          ariaLabel="Klicke hier, um den Datensatz freizugeben"
                          on:click={() =>
							approvalAsync(ApprovalSection.Speaker, speaker.id, speaker.requested_changes)}
                    >Freigeben
                    </Button
                    >
                </div>
            </div>
        {/each}
    {:else}
        <TextLine classes="dashboard-admin-approval-no-data-message"
        >Keine Freigaben für Speaker verfügbar.
        </TextLine
        >
    {/if}
</SectionDashboard>

<SectionDashboard classes="dashboard-admin-approval-section">
    <HeadlineH2 classes="dashboard-admin-approval-headline-h2">Team Member</HeadlineH2>
    {#if data.teamMember.length > 0}
        {#each data.teamMember as member}
            <div class="dashboard-admin-approval">
                <SubHeadline
                      id={getSectionHash(ApprovalSection.TeamMember, member.id)}
                      classes="dashboard-admin-approval-subheading">{member.account.username}</SubHeadline
                >
                <SaveMessage bind:this={saveMessages[ApprovalSection.TeamMember][member.id]} />
                <MessageWrapper messages={specificErrors[ApprovalSection.TeamMember][member.id]} />
                <div class="dashboard-admin-approval-grid">
                    <TextLine>Event:</TextLine>
                    <TextLine>{member.event.title}</TextLine>
                    <TextLine classes={getBackgroundClass(member.diff, 'name')}>Name:</TextLine>
                    <TextLine classes={getBackgroundClass(member.diff, 'name')}>{member.name}</TextLine>
                    <TextLine classes={getBackgroundClass(member.diff, 'short_bio')}
                    >Kurzbeschreibung:
                    </TextLine
                    >
                    <TextLine classes={getBackgroundClass(member.diff, 'short_bio')}
                    >{member.short_bio}</TextLine
                    >
                    <TextLine classes={getBackgroundClass(member.diff, 'bio')}>Beschreibung:</TextLine>
                    <Paragraph classes={getBackgroundClass(member.diff, 'bio')}>{member.bio}</Paragraph>
                    <TextLine classes={getBackgroundClass(member.diff, 'photo')}>Foto:</TextLine>
                    <Image
                          classes={getBackgroundClass(member.diff, 'photo')}
                          alt={'Team-Member-Bild von ' + member.name}
                          src={apiUrl(`/api/${member.photo}`)}
                    />
                </div>
                <TextArea
                      rows={5}
                      id={'dashboard-admin-approval-team-member-changes-' + member.id}
                      ariaLabel="Trage hier die Änderungswünsche den aktuellen Datensatzes ein."
                      labelText="Änderungswünsche:"
                      bind:value={member.requested_changes}
                      on:submit={() =>
						requestChangesAsync(ApprovalSection.TeamMember, member.id, member.requested_changes)}
                      on:input={setUnsavedChanges}
                />
                <div class="dashboard-admin-approval-button-array">
                    <Button
                          ariaLabel="Klicke hier, um Änderungswünsche zu stellen"
                          on:click={() =>
							requestChangesAsync(ApprovalSection.TeamMember, member.id, member.requested_changes)}
                    >Änderungswünsche
                    </Button
                    >
                    <Button
                          ariaLabel="Klicke hier, um den Datensatz freizugeben"
                          on:click={() =>
							approvalAsync(ApprovalSection.TeamMember, member.id, member.requested_changes)}
                    >Freigeben
                    </Button
                    >
                </div>
            </div>
        {/each}
    {:else}
        <TextLine classes="dashboard-admin-approval-no-data-message"
        >Keine Freigaben für Team Member verfügbar.
        </TextLine
        >
    {/if}
</SectionDashboard>

<SectionDashboard classes="dashboard-admin-approval-section">
    <HeadlineH2 classes="dashboard-admin-approval-headline-h2">Social Media</HeadlineH2>
    {#if data.socialMedia.length > 0}
        {#each data.socialMedia as media}
            <div class="dashboard-admin-approval">
                <SubHeadline
                      id={getSectionHash(ApprovalSection.SocialMedia, media.id)}
                      classes="dashboard-admin-approval-subheading">{media.account.username}</SubHeadline
                >
                <SaveMessage bind:this={saveMessages[ApprovalSection.SocialMedia][media.id]} />
                <MessageWrapper messages={specificErrors[ApprovalSection.SocialMedia][media.id]} />
                <div class="dashboard-admin-approval-grid-big">
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
                      on:submit={() =>
						requestChangesAsync(ApprovalSection.SocialMedia, media.id, media.requested_changes)}
                      on:input={setUnsavedChanges}
                />
                <div class="dashboard-admin-approval-button-array">
                    <Button
                          ariaLabel="Klicke hier, um Änderungswünsche zu stellen"
                          on:click={() =>
							requestChangesAsync(ApprovalSection.SocialMedia, media.id, media.requested_changes)}
                    >Änderungswünsche
                    </Button
                    >
                    <Button
                          ariaLabel="Klicke hier, um den Datensatz freizugeben"
                          on:click={() =>
							approvalAsync(ApprovalSection.SocialMedia, media.id, media.requested_changes)}
                    >Freigeben
                    </Button
                    >
                </div>
            </div>
        {/each}
    {:else}
        <TextLine classes="dashboard-admin-approval-no-data-message"
        >Keine Freigaben für Social Media Links verfügbar.
        </TextLine
        >
    {/if}
</SectionDashboard>

<style>
    :global(.dashboard-admin-approval-section) {
        display:        flex;
        flex-direction: column;
        max-width:      100rem;
    }

    :global(.dashboard-admin-approval-headline-h2) {
        align-self: center;
        margin-top: var(--4x-margin);
    }

    :global(.dashboard-admin-approval-subheading) {
        scroll-margin-top: var(--16x-margin);
        justify-self:      center;
    }

    :global(.dashboard-admin-approval-has-changed-background) {
        background-color: var(--primary-color-light);
        border-radius:    var(--border-radius);
        padding:          var(--half-padding);
    }

    .dashboard-admin-approval {
        margin:        var(--4x-margin) 0;
        border:        1px solid var(--primary-color-dark);
        border-radius: var(--border-radius);
        padding:       var(--full-padding) var(--2x-padding);
    }

    .dashboard-admin-approval-grid {
        justify-self:          center;
        display:               grid;
        grid-template-columns: 20rem 1fr;
        gap:                   var(--quad-gap);
        margin:                var(--2x-margin) 0;
    }

    .dashboard-admin-approval-grid-big {
        display:      flex;
        gap:          var(--full-gap);
        justify-self: center;
        margin:       var(--2x-margin) 0;
    }

    :global(.dashboard-admin-approval-social-media-text) {
        align-self: center;
    }

    .dashboard-admin-approval-button-array {
        display:         flex;
        flex-direction:  row;
        justify-content: center;
        gap:             var(--full-gap);
        margin:          var(--full-margin);
    }

    :global(.dashboard-admin-approval-no-data-message) {
        align-self: center;
    }
</style>
