<script lang="ts">
	import * as Menu from 'menu/dashboard';
	import * as MenuItem from 'menu/menuItems';

	import type { LoadDashboard, LoadUserSocials } from 'types/dashboardLoadTypes';

	import Tabs from 'elements/navigation/tabs.svelte';
	import UnsavedChangesCallbackWrapper from 'elements/navigation/unsavedChangesCallbackWrapper.svelte';
	import Message from 'elements/text/message.svelte';
	import SectionDashboard from 'elements/section/sectionDashboard.svelte';
	import EditSocialMedia from 'elements/input/editSocialMedia.svelte';
	import Button from 'elements/input/button.svelte';

	export let data: LoadDashboard & LoadUserSocials;

	async function trySaveAsync(): Promise<boolean> {
		console.log('try save socials');
		return false;
	}

	function deleteLink(index: number): void {}

	function addLink(): void {}
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
			message={'Hinweis:\nDie Social Media Links sind Account gebunden.\nDaher sind dies die gleichen Links wie im Team Member Tab.'}
		/>
	{/if}

	<EditSocialMedia
		links={data.socials}
		socialMediaTypes={data.socialTypes.map((x) => x.name)}
		deleteCallback={deleteLink}
	/>
	<Button ariaLabel="Klicke hier, um einen neuen Link hinzuzufügen" on:click={addLink}>Neu</Button>
</SectionDashboard>
