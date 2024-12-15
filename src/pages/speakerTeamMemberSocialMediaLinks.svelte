<script lang="ts">
	import * as Menu from 'menu/dashboard';
	import * as MenuItem from 'menu/menuItems';

	import type { LoadDashboard, LoadUserSocials } from 'types/dashboardLoadTypes';
	import type { DashboardSocialMediaLink } from 'types/dashboardProvideTypes';
	import type {
		SetAllUpdateSocialMediaLink,
		SetCreateSocialMediaLink
	} from 'types/dashboardSetTypes';

	import Tabs from 'elements/navigation/tabs.svelte';
	import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
	import Message from 'elements/text/message.svelte';
	import SectionDashboard from 'elements/section/sectionDashboard.svelte';
	import EditSocialMedia from 'elements/input/editSocialMedia.svelte';
	import Button from 'elements/input/button.svelte';
	import GeneralPopup from 'elements/navigation/generalPopup.svelte';

	import { error } from '@sveltejs/kit';
	import { trySaveDashboardDataAsync } from 'helper/trySaveDashboardData';
	import { isSaveType } from 'types/saveMessageType';
	import { setUnsavedChanges } from 'stores/saved';
	import { apiUrl } from 'helper/links';

	export let data: LoadDashboard & LoadUserSocials;

	let deletePopup: GeneralPopup;

	function getIDFromSocialMediaType(type: string): number {
		for (var element of data.socialTypes) {
			if (type === element.name) {
				return element.id;
			}
		}
		console.log(`not able to look up requested social media link type ID: ${type}`);
		throw error(500);
	}

	async function deleteLinkAsync(index: number): Promise<void> {
		const id = data.socials[index].id;
		const deleteResponse: Response = await fetch(
			apiUrl(`/api/dashboard/user/social-media-link/${id}`),
			{ method: 'DELETE' }
		);
		if (!deleteResponse.ok) {
			console.error(`Deleting Link: Bad Backend response: ${deleteResponse.status}`);
			return;
		}

		data.socials = data.socials.filter((item) => item.id !== id);
	}

	function addLink(): void {
		const newLink: DashboardSocialMediaLink = {
			approved: false,
			id: 0,
			name: 'Web',
			url: '',
			user_id: data.roles.user_id,
			requested_changes: null,
			social_media_type_id: getIDFromSocialMediaType('Web')
		};
		data.socials = [...data.socials, newLink];
	}

	async function trySaveAsync(): Promise<boolean> {
		const toSave: SetAllUpdateSocialMediaLink = { social_media_links: [] };
		for (var link of data.socials) {
			if (link.id === 0) {
				await tryCreateAsync(link);
				continue;
			}

			toSave.social_media_links.push({
				id: link.id,
				url: link.url
			});
		}

		const messageType = await trySaveDashboardDataAsync<SetAllUpdateSocialMediaLink>(
			toSave,
			'/api/dashboard/user/social-media-link'
		);

		return isSaveType(messageType);
	}

	async function tryCreateAsync(link: DashboardSocialMediaLink): Promise<boolean> {
		const toSave: SetCreateSocialMediaLink = {
			social_media_type_id: getIDFromSocialMediaType(link.name),
			url: link.url
		};

		const messageType = await trySaveDashboardDataAsync<SetCreateSocialMediaLink>(
			toSave,
			'/api/dashboard/user/social-media-link',
			'POST'
		);

		return isSaveType(messageType);
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
	text="Gelöschte Links können nicht wieder hergestellt werden."
	acceptButtonText="Löschen"
	denyButtonText="Abbrechen"
	acceptCallback={(value) => {
		if (typeof value === 'number') {
			deleteLinkAsync(value);
			return;
		}

		console.error('provided entry index from generic popup is not number');
	}}
	denyCallback={(e) => {}}
></GeneralPopup>

<SectionDashboard classes="standard-dashboard-section">
	{#if data.roles.is_speaker && data.roles.is_team_member}
		<Message
			classes="message-pre-wrap"
			message={'Hinweis:\nDie Social Media Links sind Account gebunden.\nDaher sind dies die gleichen Links wie im Team Member Tab.'}
		/>
	{/if}

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
			<Button ariaLabel="Klicke hier, um einen neuen Link hinzuzufügen" on:click={addLink}
				>Neu</Button
			>
			<Button ariaLabel="Klicke hier, um die Eingaben zu speichern" type={'submit'}
				>Speichern</Button
			>
		</div>
	</form>
</SectionDashboard>

<style>
	.dashboard-social-media-links-button-wrapper {
		display: flex;
		flex-direction: row;
		gap: var(--full-gap);
		margin-top: var(--4x-gap);
		justify-content: center;
	}
</style>
