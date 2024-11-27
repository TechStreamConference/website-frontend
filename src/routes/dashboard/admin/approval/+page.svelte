<script lang="ts">
	import type { LoadAdminApproval } from 'types/dashboardLoadTypes';

	import SectionDashboard from 'elements/section/sectionDashboard.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import TextArea from 'elements/input/textArea.svelte';
	import Button from 'elements/input/button.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';
	import Image from 'elements/image/image.svelte';
	import HeadlineH2 from 'elements/text/headlineH2.svelte';
	import Message from 'elements/text/message.svelte';
	import SaveMessage from 'elements/text/saveMessage.svelte';

	import { apiUrl } from 'helper/links';
	import { scrollToAnchor } from 'helper/scroll';
	import { GetBackgroundClass } from './approvalHelper';
	import { SaveMessageType } from 'types/saveMessageType';
	import { resetUnsavedChanges, setUnsavedChanges } from 'stores/saved';
	import { ApprovalSection, getSectionHash } from 'types/approvalSection';
	import { validateApproval, validateRequestedChanges } from './approvalValidation';

	export let data: LoadAdminApproval;

	const saveMessages: { [key in ApprovalSection]: { [key: number]: SaveMessage } } = {
		0: {},
		1: {},
		2: {}
	};
	const specificErrors: { [key in ApprovalSection]: { [key: number]: string[] } } = {
		0: {},
		1: {},
		2: {}
	};
	const routePartLookup: { [key in ApprovalSection]: string } = {
		0: 'speaker',
		1: 'team-member',
		2: 'social-media'
	};

	async function RequestChanges(
		section: ApprovalSection,
		id: number,
		changes: string
	): Promise<void> {
		const messages: string[] = validateRequestedChanges(changes);
		specificErrors[section][id] = messages;
		scrollToAnchor(getSectionHash(section, id));

		if (messages.length > 0) {
			return;
		}

		await SaveRequestedChanges(section, id, changes);
	}

	async function SaveRequestedChanges(
		section: ApprovalSection,
		id: number,
		change: string
	): Promise<void> {
		const route: string = apiUrl(
			`/api/dashboard/admin/approval/${routePartLookup[section]}/${id}/request-changes`
		);
		const response: Response = await fetch(route, {
			method: 'PUT',
			body: JSON.stringify({ message: change })
		});

		if (!response.ok) {
			saveMessages[section][id].setSaveMessage(SaveMessageType.Error);
			return;
		}

		resetUnsavedChanges();
		saveMessages[section][id].setSaveMessage(SaveMessageType.Save);
	}

	async function Approval(section: ApprovalSection, id: number, changes: string): Promise<void> {
		const messages: string[] = validateApproval(changes);
		specificErrors[section][id] = messages;
		scrollToAnchor(getSectionHash(section, id));

		if (messages.length > 0) {
			return;
		}

		await SaveApproval(section, id);
	}

	async function SaveApproval(section: ApprovalSection, id: number) {
		const route: string = apiUrl(`/api/dashboard/admin/approval/${routePartLookup[section]}/${id}`);
		const response: Response = await fetch(route, {
			method: 'PUT'
		});

		if (!response.ok) {
			saveMessages[section][id].setSaveMessage(SaveMessageType.Error);
		}

		resetUnsavedChanges();
		saveMessages[section][id].setSaveMessage(SaveMessageType.Approved);
	}
</script>

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
				{#if specificErrors[ApprovalSection.Speaker][speaker.id]}
					{#each specificErrors[ApprovalSection.Speaker][speaker.id] as error}
						<Message message={error} />
					{/each}
				{/if}
				<div class="dashboard-admin-approval-grid">
					<TextLine>Event:</TextLine>
					<TextLine>{speaker.event.title}</TextLine>
					<TextLine classes={GetBackgroundClass(speaker.diff, 'name')}>Name:</TextLine>
					<TextLine classes={GetBackgroundClass(speaker.diff, 'name')}>{speaker.name}</TextLine>
					<TextLine classes={GetBackgroundClass(speaker.diff, 'short_bio')}
						>Kurzbeschreibung:</TextLine
					>
					<TextLine classes={GetBackgroundClass(speaker.diff, 'short_bio')}
						>{speaker.short_bio}</TextLine
					>
					<TextLine classes={GetBackgroundClass(speaker.diff, 'bio')}>Beschreibung:</TextLine>
					<Paragraph classes={GetBackgroundClass(speaker.diff, 'bio')}>{speaker.bio}</Paragraph>
					<TextLine classes={GetBackgroundClass(speaker.diff, 'photo')}>Foto:</TextLine>
					<Image
						classes={GetBackgroundClass(speaker.diff, 'photo')}
						alt={'Speakerbild von ' + speaker.name}
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
						RequestChanges(ApprovalSection.Speaker, speaker.id, speaker.requested_changes)}
					on:input={setUnsavedChanges}
				/>
				<div class="dashboard-admin-approval-button-array">
					<Button
						ariaLabel="Klicke hier, um Änderungswünsche zu stellen"
						on:click={() =>
							RequestChanges(ApprovalSection.Speaker, speaker.id, speaker.requested_changes)}
						>Änderungswünsche</Button
					>
					<Button
						ariaLabel="Klicke hier, um den Datensatz freizugeben"
						on:click={() =>
							Approval(ApprovalSection.Speaker, speaker.id, speaker.requested_changes)}
						>Freigeben</Button
					>
				</div>
			</div>
		{/each}
	{:else}
		<TextLine classes="dashboard-admin-approval-no-data-message"
			>Keine Freigaben für Speaker verfügbar.</TextLine
		>
	{/if}
</SectionDashboard>

<SectionDashboard classes="dashboard-admin-approval-section">
	<HeadlineH2 classes="dashboard-admin-approval-headline-h2">Team Member</HeadlineH2>
	{#if data.teamMember.length > 0}
		<TextLine>TODO: Hier Team Member anzeigen.</TextLine>
	{:else}
		<TextLine classes="dashboard-admin-approval-no-data-message"
			>Keine Freigaben für Team Member verfügbar.</TextLine
		>
	{/if}
</SectionDashboard>

<SectionDashboard classes="dashboard-admin-approval-section">
	<HeadlineH2 classes="dashboard-admin-approval-headline-h2">Social Media</HeadlineH2>
	{#if data.socialMedia.length > 0}
		<TextLine>TODO: Hier Social Media Links anzeigen.</TextLine>
	{:else}
		<TextLine classes="dashboard-admin-approval-no-data-message"
			>Keine Freigaben für Social Media Links verfügbar.</TextLine
		>
	{/if}
</SectionDashboard>

<style>
	:global(.dashboard-admin-approval-section) {
		display: flex;
		flex-direction: column;
		max-width: 100rem;
	}

	:global(.dashboard-admin-approval-headline-h2) {
		align-self: center;
		margin-top: var(--4x-margin);
	}

	:global(.dashboard-admin-approval-subheading) {
		scroll-margin-top: var(--16x-margin);
		justify-self: center;
	}

	:global(.dashboard-admin-approval-has-changed-background) {
		background-color: var(--primary-color-light);
		border-radius: var(--border-radius);
		padding: var(--half-padding);
	}

	.dashboard-admin-approval {
		margin: var(--4x-margin) 0;
	}

	.dashboard-admin-approval-grid {
		justify-self: center;
		display: grid;
		grid-template-columns: 20rem 1fr;
		gap: var(--quad-gap);
		margin: var(--2x-margin) 0;
	}

	.dashboard-admin-approval-button-array {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: var(--full-gap);
		margin: var(--full-margin);
	}

	:global(.dashboard-admin-approval-no-data-message) {
		align-self: center;
	}
</style>
