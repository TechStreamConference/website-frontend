<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';
    import * as SocialHelper from 'pageHelper/speakerTeamMemberSocials';
    import * as EventHelper from 'pageHelper/speakerTeamMemberEvent';

    import type { NewImage } from 'pageHelper/speakerTeamMemberEvent';
    import type { LoadDashboard, LoadUserApplication } from 'types/dashboardLoadTypes';
    import type { SetCreateSocialMediaLink, SetSpeakerTeamMemberEvent } from 'types/dashboardSetTypes';

    import { SaveMessageType } from 'types/saveMessageType';
    import { formatDate } from 'helper/dates';
    import { trySaveDataAsync } from 'helper/trySaveData';
    import { scrollToTop } from 'helper/scroll';

    import Tabs from 'elements/navigation/tabs.svelte';
    import SpeakerTeamMemberEventForm from 'forms/speakerTeamMemberEventForm.svelte';
    import SpeakerTeamMemberSocialMediaLinkForm from 'forms/speakerTeamMemberSocialMediaLinksForm.svelte';
    import Button from 'elements/input/button.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import StyledLink from 'elements/input/styledLink.svelte';
    import HeadlineH2 from 'elements/text/headlineH2.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';

    export let data: LoadDashboard & LoadUserApplication;

    let saveMessage: SaveMessage;
    let errorList: string[] = [];
    let success: boolean    = false;
    let eventForm: SpeakerTeamMemberEventForm;

    function deleteLink(e: CustomEvent<number>) {
        if (!data.data) {
            console.error('data is undefined');
            return;
        }

        const index: number = e.detail;
        if (index < 0 || index >= data.data.socials.socials.length) {
            console.error('index out of range');
            return;
        }

        data.data.socials.socials.splice(e.detail, 1);
        data.data.socials.socials = data.data.socials.socials;
    }

    function validate(event: SetSpeakerTeamMemberEvent, image: NewImage): boolean {
        if (!data.data) {
            return false;
        }
        errorList = [];

        const socialResult: SocialHelper.ValidateReturn = SocialHelper.validate(data.data.socials.socials);
        const eventResult: EventHelper.ValidateReturn   = EventHelper.validate(event);
        errorList                                       = socialResult.messages;
        errorList.push(...(eventResult.messages));
        if (!image.imageFile) {
            errorList.push('Das Profilbild fehlt.');
        }
        data.data.socials.socials = socialResult.data;

        return errorList.length === 0;
    }

    async function trySave(): Promise<boolean> {
        scrollToTop();
        if (!data.data) {
            console.error('data member is undefined.');
            saveMessage.setSaveMessage(SaveMessageType.Error);
            return false;
        }
        const image: EventHelper.NewImage      = eventForm.getNewImage();
        const event: SetSpeakerTeamMemberEvent = {
            bio:        data.data.speaker.event.bio,
            short_bio:  data.data.speaker.event.short_bio,
            name:       data.data.speaker.event.name,
            photo_size: image.lastPhotoSize,
            photo_x:    image.lastPhotoX,
            photo_y:    image.lastPhotoY,
        };

        if (!validate(event, image)) {
            saveMessage.setSaveMessage(SaveMessageType.Error);
            return false;
        }

        const socials: SetCreateSocialMediaLink[] = (() => {
            let toReturn: SetCreateSocialMediaLink[] = [];
            for (const entry of data.data.socials.socials) {
                toReturn.push({
                                  url:                  entry.url,
                                  social_media_type_id: SocialHelper.getIDFromSocialMediaType(
                                      data.data.socials.socialTypes,
                                      entry.name,
                                  ),
                              });
            }
            return toReturn;
        })();

        const formData = new FormData();
        formData.append('json', JSON.stringify({
                                                   application:        event,
                                                   social_media_links: socials,
                                               }));
        if (image.imageFile) {
            formData.append('photo', image.imageFile);
        }

        const result = await trySaveDataAsync(fetch, formData, '/dashboard/user/apply-as-speaker', 'POST');

        saveMessage.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = result.messages;
        success   = result.success;
        return result.success;
    }
</script>

<Tabs
      entries={Menu.user}
      entryName={MenuItem.userApplication.name}
      classes="navigation-tabs-dashboard-subpage"
/>
<UnsavedChangesCallbackWrapper callback={trySave} />

<SectionDashboard classes="standard-dashboard-section">
    {#if success}
        <div class="dashboard-user-application-error">
            <Paragraph classes="paragraph-pre-wrap"
                       --text-align="center">
                {"Du hast dich erfolgreich beworben.\nWir werden nun deine Bewerbung kontrollieren.\nWenn wir dich annehmen, kannst du deine Daten im Speaker-Dashboard bearbeiten.\nDazu wird dann ein neuer Tab oben rechts erscheinen."}
            </Paragraph>
        </div>
    {:else if data.error}
        <div class="dashboard-user-application-error">
            <Paragraph classes="paragraph-pre-wrap"
                       --text-align="center">{data.error.error}</Paragraph>
        </div>
    {:else if data.data}
        <form class="dashboard-user-application-form"
              on:submit|preventDefault={trySave}>
            <div class="dashboard-user-application-event-infos">
                <HeadlineH2>{data.data.event.title}</HeadlineH2>
                <TextLine>{formatDate(data.data.event.start_date, '%DD.%MM.')}
                    - {formatDate(data.data.event.end_date, '%DD.%MM.%YYYY')}</TextLine>
                <TextLine>Noch bis: {formatDate(data.data.event.call_for_papers_end, '%DD.%MM.%YYYY')}</TextLine>
            </div>
            <SaveMessage bind:this={saveMessage} />
            <MessageWrapper messages={errorList} />
            <div class="dashboard-user-application-section">
                <HeadlineH2>Deine Bewerbung</HeadlineH2>
                <SpeakerTeamMemberEventForm bind:this={eventForm}
                                            bind:data={data.data.speaker}
                                            displaySaveButton={false} />
            </div>
            <div class="dashboard-user-application-section">
                <HeadlineH2>Social-Media-Daten</HeadlineH2>
                <SpeakerTeamMemberSocialMediaLinkForm bind:data={data.data.socials}
                                                      bind:roles={data.roles}
                                                      displaySaveButton={false}
                                                      on:delete={deleteLink} />
            </div>
            <div class="dashboard-user-application-button-wrapper">
                <Button type="submit"
                        ariaLabel="Klicke hier, um dich zu bewerben">Bewerben
                </Button>
            </div>
        </form>
    {/if}
</SectionDashboard>


<style>
    .dashboard-user-application-error {
        display:        flex;
        flex-direction: column;
        gap:            var(--4x-gap);
        margin-top:     var(--8x-margin);
    }

    .dashboard-user-application-event-infos {
        display:        flex;
        flex-direction: column;
        align-items:    center;
        gap:            var(--full-gap);
    }

    .dashboard-user-application-form {
        margin-top:     var(--8x-margin);
        display:        flex;
        flex-direction: column;
        gap:            var(--8x-gap);
    }

    .dashboard-user-application-section {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
        border:         1px solid var(--primary-color-dark);
        padding:        var(--full-padding);
        border-radius:  var(--border-radius);

    }

    .dashboard-user-application-button-wrapper {
        display:         flex;
        flex-direction:  row;
        justify-content: center;
        gap:             var(--2x-gap);
    }
</style>
