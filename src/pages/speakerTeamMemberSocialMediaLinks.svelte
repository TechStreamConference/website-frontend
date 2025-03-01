<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/dashboardItems';

    import type { SaveResult } from 'helper/trySaveData';
    import type { LoadDashboard, LoadUserSocials } from 'types/dashboardLoadTypes';
    import type { DashboardSocialMediaLink } from 'types/dashboardProvideTypes';
    import type { SetAllUpdateSocialMediaLink, SetCreateSocialMediaLink } from 'types/dashboardSetTypes';
    import type { DeleteReturn, ValidateReturn } from 'pageHelper/speakerTeamMemberSocials';

    import { SaveMessageType } from 'types/saveMessageType';
    import { combineSaveResult, trySaveDataAsync } from 'helper/trySaveData';
    import {
        deleteLinkAsync, getIDFromSocialMediaType, loadSocials, validate,
    } from 'pageHelper/speakerTeamMemberSocials';

    import Tabs from 'elements/navigation/tabs.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import Message from 'elements/text/message.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';
    import SpeakerTeamMemberSocialMediaLinkForm from 'forms/speakerTeamMemberSocialMediaLinksForm.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';

    export let data: LoadDashboard & LoadUserSocials;
    export let type: 'speaker' | 'team-member';

    let saveMessage: SaveMessage;
    let errorList: string[] = [];


    async function trySaveAsync(): Promise<boolean> {
        const validateResult: ValidateReturn = validate(data.socials);
        errorList                            = validateResult.messages;
        data.socials                         = validateResult.data;
        if (errorList.length > 0) {
            return false;
        }

        const toSave: SetAllUpdateSocialMediaLink = { social_media_links: [] };
        let createResult: SaveResult              = {
            success:  true,
            messages: [],
        };
        for (let link of data.socials) {
            if (link.id === 0) {
                const result = await tryCreateAsync(link);
                if (!result.success) {
                    createResult.success = false;
                    createResult.messages.push(...result.messages);
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

        const saveResult: SaveResult = await (async () => {
            if (toSave.social_media_links.length === 0) {
                return {
                    success:  true,
                    messages: [],
                };
            }

            return await trySaveDataAsync(fetch, toSave, '/dashboard/user/social-media-link', 'PUT');
        })();

        const result = combineSaveResult(createResult, saveResult);

        saveMessage.setSaveMessage(result.success ? SaveMessageType.Save : SaveMessageType.Error);
        errorList = result.messages;

        const reload = result.success && data.socials.length !== toSave.social_media_links.length;
        if (reload) {
            data.socials = await loadSocials(fetch);
        }

        return result.success;
    }

    async function tryCreateAsync(link: DashboardSocialMediaLink): Promise<SaveResult> {
        const toSave: SetCreateSocialMediaLink = {
            social_media_type_id: getIDFromSocialMediaType(data.socialTypes, link.name),
            url:                  link.url,
        };

        return await trySaveDataAsync(fetch, toSave, '/dashboard/user/social-media-link', 'POST');
    }

    async function tryDeleteAsync(e: CustomEvent<number>): Promise<void> {
        const value: number              = e.detail;
        const deleteResult: DeleteReturn = await deleteLinkAsync(fetch, data.socials, value);
        saveMessage.setSaveMessage(deleteResult.result.success ? SaveMessageType.Delete : SaveMessageType.Error);
        errorList    = deleteResult.result.messages;
        data.socials = deleteResult.data;
    }
</script>

<Tabs
      entries={type === "speaker" ? Menu.speaker : Menu.teamMember}
      entryName={type === "speaker" ? MenuItem.speakerSocialMedia.name : MenuItem.teamMemberSocialMedia.name}
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
    <MessageWrapper messages={errorList} />

    <SpeakerTeamMemberSocialMediaLinkForm bind:data={data}
                                          bind:roles={data.roles}
                                          on:save={trySaveAsync}
                                          on:delete={tryDeleteAsync} />


</SectionDashboard>
