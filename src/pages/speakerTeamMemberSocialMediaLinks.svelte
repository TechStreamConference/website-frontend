<script lang="ts">
    import * as Menu from 'menu/dashboard';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadDashboard, LoadUserSocials } from 'types/dashboardLoadTypes';
    import type { DashboardSocialMediaLink } from 'types/dashboardProvideTypes';
    import type {
        SetAllUpdateSocialMediaLink, SetCreateSocialMediaLink,
    } from 'types/dashboardSetTypes';

    import Tabs from 'elements/navigation/tabs.svelte';
    import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
    import Message from 'elements/text/message.svelte';
    import SectionDashboard from 'elements/section/sectionDashboard.svelte';
    import EditSocialMedia from 'elements/input/editSocialMedia.svelte';
    import Button from 'elements/input/button.svelte';
    import GeneralPopup from 'elements/popups/generalPopup.svelte';
    import SaveMessage from 'elements/text/saveMessage.svelte';

    import { error } from '@sveltejs/kit';
    import { trySaveDashboardDataAsync } from 'helper/trySaveDashboardData';
    import { isSuccessType, SaveMessageType } from 'types/saveMessageType';
    import { setUnsavedChanges } from 'stores/saved';
    import { apiUrl } from 'helper/links';
    import { z } from 'zod';
    import { loadSocials } from 'pageHelper/loadSocials';

    export let data: LoadDashboard & LoadUserSocials;

    let deletePopup: GeneralPopup;
    let saveMessage: SaveMessage;
    let messages: string[] = [];

    function getIDFromSocialMediaType(type: string): number {
        for (let element of data.socialTypes) {
            if (type === element.name) {
                return element.id;
            }
        }
        console.error(`not able to look up requested social media link type ID: ${type}`);
        throw error(500);
    }

    function validate(): string[] {
        const https: string      = 'https://';
        const http: string       = 'http://';
        const messages: string[] = [];
        for (let entry of data.socials) {
            entry.url = entry.url.trim();
            if (entry.url.length === 0) {
                messages.push(`Ein ${entry.name} - Eintrag ist leer`);
                continue;
            }

            if (!entry.url.startsWith(https) && !entry.url.startsWith(http)) {
                entry.url = https + entry.url;
            }

            const validated = z.string().url().safeParse(entry.url);
            if (!validated.success) {
                messages.push(`${entry.url} ist keine valide URL.`);
                continue; // keep this continue here to prevent bugs when one adds code after this.
            }
        }

        data.socials = data.socials; // reassign for reactivity
        return messages;
    }

    async function deleteLinkAsync(index: number): Promise<void> {
        const id = data.socials[index].id;
        if (id !== 0) {
            const deleteResponse: Response = await fetch(
                apiUrl(`/api/dashboard/user/social-media-link/${id}`),
                { method: 'DELETE' },
            );
            if (!deleteResponse.ok) {
                saveMessage.setSaveMessage(SaveMessageType.DeleteError);
                console.error(`Deleting Link: Bad Backend response: ${deleteResponse.status}`);
                return;
            }
        }

        data.socials = data.socials.filter((item) => item.id !== id);
        saveMessage.setSaveMessage(SaveMessageType.Delete);
    }

    function addLink(): void {
        const newLink: DashboardSocialMediaLink = {
            approved:             false,
            id:                   0,
            name:                 'Web',
            url:                  '',
            user_id:              data.roles.user_id,
            requested_changes:    null,
            social_media_type_id: getIDFromSocialMediaType('Web'),
        };
        data.socials                            = [
            ...data.socials,
            newLink,
        ];
    }

    async function trySaveAsync(): Promise<boolean> {
        messages = validate();
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
                                               social_media_type_id: getIDFromSocialMediaType(link.name),
                                               url:                  link.url,
                                           });
        }

        const messageType = await trySaveDashboardDataAsync<SetAllUpdateSocialMediaLink>(
            toSave,
            '/api/dashboard/user/social-media-link',
        );

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
            social_media_type_id: getIDFromSocialMediaType(link.name),
            url:                  link.url,
        };

        const messageType = await trySaveDashboardDataAsync<SetCreateSocialMediaLink>(
            toSave,
            '/api/dashboard/user/social-media-link',
            'POST',
        );

        return isSuccessType(messageType);
    }
</script>

<Tabs
      entries={Menu.speaker}
      entryName={MenuItem.speakerSocialMedia.name}
      classes="navigation-tabs-dashboard-subpage"
/>
<UnsavedChangesCallbackWrapper callback={trySaveAsync} />
<GeneralPopup
      bind:this={deletePopup}
      headline="Link löschen?"
      text="Gelöschte Links können nicht wiederhergestellt werden."
      acceptButtonText="Löschen"
      denyButtonText="Abbrechen"
      acceptCallback={(value) => {
		if (typeof value === 'number') {
			deleteLinkAsync(value);
			return;
		}

		console.error('provided entry index from generic popup is not number');
	}}
      denyCallback={() => {}}
></GeneralPopup>

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

    <form on:submit|preventDefault={trySaveAsync}>
        <EditSocialMedia
              links={data.socials}
              socialMediaTypes={data.socialTypes.map((x) => x.name)}
              deleteCallback={(e) => {
				deletePopup.show(e);
			}}
              on:input={setUnsavedChanges}
        />
        <div class="dashboard-social-media-links-button-wrapper">
            <Button ariaLabel="Klicke hier, um einen neuen Link hinzuzufügen"
                    on:click={addLink}
            >Neu
            </Button
            >
            <Button ariaLabel="Klicke hier, um die Eingaben zu speichern"
                    type={'submit'}
            >Speichern
            </Button
            >
        </div>
    </form>
</SectionDashboard>

<style>
    .dashboard-social-media-links-button-wrapper {
        display:         flex;
        flex-direction:  row;
        gap:             var(--full-gap);
        margin-top:      var(--4x-gap);
        justify-content: center;
    }
</style>
