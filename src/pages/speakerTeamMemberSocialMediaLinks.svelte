<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadDashboard, LoadUserSocials } from 'types/dashboardLoadTypes';
    import type { DashboardSocialMediaLink } from 'types/dashboardProvideTypes';
    import type { SetAllUpdateSocialMediaLink, SetCreateSocialMediaLink } from 'types/dashboardSetTypes';
    import type { DeleteReturn, ValidateReturn } from 'pageHelper/speakerTeamMemberSocials';

    import Tabs from 'elements/navigation/tabs.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import Message from 'elements/text/message.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import SpeakerTeamMemberSocialMediaLinkForm from './speakerTeamMemberSocialMediaLinksForm.svelte';

    import { trySaveDashboardDataAsync } from 'helper/trySaveDashboardData';
    import { isSuccessType, SaveMessageType } from 'types/saveMessageType';
    import { deleteLinkAsync, loadSocials } from 'pageHelper/speakerTeamMemberSocials';
    import { getIDFromSocialMediaType, validate } from 'pageHelper/speakerTeamMemberSocials';

    export let data: LoadDashboard & LoadUserSocials;

    let saveMessage: SaveMessage;
    let messages: string[] = [];


    async function trySaveAsync(): Promise<boolean> {
        const validateResult: ValidateReturn = validate(data.socials);
        messages                             = validateResult.messages;
        data.socials                         = validateResult.data;
        if (messages.length > 0) {
            return false;
        }

        const toSave: SetAllUpdateSocialMediaLink = { social_media_links: [] };
        let createFail: boolean                   = false;
        for (let link of data.socials) {
            if (link.id === 0) {
                if (!(await tryCreateAsync(link))) {
                    createFail = true;
                }
                continue;
            }

            toSave.social_media_links.push({
                                               id:                   link.id,
                                               social_media_type_id: getIDFromSocialMediaType(
                                                   data.socialTypes,
                                                   link.name,
                                               ),
                                               url:                  link.url,
                                           });
        }

        const messageType = await (async () => {
            if (toSave.social_media_links.length === 0) {
                return SaveMessageType.Save;
            }
            return await trySaveDashboardDataAsync<SetAllUpdateSocialMediaLink>(
                toSave,
                '/api/dashboard/user/social-media-link',
            );
        })();

        const success: boolean = isSuccessType(messageType);

        if (!success || createFail) {
            saveMessage.setSaveMessage(SaveMessageType.Error);
        } else {
            saveMessage.setSaveMessage(SaveMessageType.Save);
            if (data.socials.length !== toSave.social_media_links.length) {
                data.socials = await loadSocials(fetch);
            }
        }

        return success;
    }

    async function tryCreateAsync(link: DashboardSocialMediaLink): Promise<boolean> {
        const toSave: SetCreateSocialMediaLink = {
            social_media_type_id: getIDFromSocialMediaType(data.socialTypes, link.name),
            url:                  link.url,
        };

        const messageType = await trySaveDashboardDataAsync<SetCreateSocialMediaLink>(
            toSave,
            '/api/dashboard/user/social-media-link',
            'POST',
        );

        return isSuccessType(messageType);
    }

    async function tryDeleteAsync(e: CustomEvent<number>): Promise<void> {
        const value: number              = e.detail;
        const deleteResult: DeleteReturn = await deleteLinkAsync(data.socials, value);
        saveMessage.setSaveMessage(deleteResult.message);
        data.socials = deleteResult.data;
    }
</script>

<Tabs
      entries={Menu.speaker}
      entryName={MenuItem.speakerSocialMedia.name}
      classes="navigation-tabs-dashboard-subpage"
/>
<UnsavedChangesCallbackWrapper callback={trySaveAsync} />

<SectionDashboard classes="standard-dashboard-section">
    {#if data.roles.is_speaker && data.roles.is_team_member}
        <Message
              classes="message-pre-wrap"
              message={'Hinweis:\nDie Social-Media-Links sind an den Account gebunden.\nÄnderungen an den Links wirken sich daher sowohl auf dein Speaker- als auch dein Team-Member-Profil aus.'}
        />
    {/if}
    <SaveMessage bind:this={saveMessage} />
    {#each messages as message}
        <Message color="error"
                 {message} />
    {/each}

    <SpeakerTeamMemberSocialMediaLinkForm bind:data={data}
                                          bind:roles={data.roles}
                                          on:save={trySaveAsync}
                                          on:delete={tryDeleteAsync} />


</SectionDashboard>
