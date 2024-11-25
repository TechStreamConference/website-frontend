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

	import { apiUrl } from 'helper/links';
	import { setUnsavedChanges } from 'stores/saved';

	export let data: LoadAdminApproval;

	function SpeakerTeamMemberRequestChanges(): void {
		console.log('TODO: changes to request');
	}

	function SpeakerTeamMemberValidate(): void {
		console.log('TODO: validate');
	}

	function GetBackgroundClass(diff: string[] | null, reference: string): string {
		if (!diff) {
			return '';
		}
		return diff.includes(reference) ? 'dashboard-admin-approval-has-changed-background' : '';
	}
</script>

<SectionDashboard classes="dashboard-admin-approval-section">
	<HeadlineH2 classes="dashboard-admin-approval-headline-h2">Speaker</HeadlineH2>
	{#if data.speaker.length > 0}
		{#each data.speaker as speaker}
			<div class="dashboard-admin-approval">
				<SubHeadline classes="dashboard-admin-approval-subheading"
					>{speaker.account.username}</SubHeadline
				>
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
					on:submit={SpeakerTeamMemberRequestChanges}
					on:input={setUnsavedChanges}
				/>
				<div class="dashboard-admin-approval-button-array">
					<Button
						ariaLabel="Klicke hier, um Änderungswünsche zu stellen"
						on:click={SpeakerTeamMemberRequestChanges}>Änderungswünsche</Button
					>
					<Button
						ariaLabel="Klicke hier, um den Datensatz freizugeben"
						on:click={SpeakerTeamMemberValidate}>Freigeben</Button
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
		justify-self: center;
	}

	:global(.dashboard-admin-approval-has-changed-background) {
		background-color: var(--primary-color-light);
		border-radius: var(--border-radius);
	}

	.dashboard-admin-approval {
		margin: var(--full-margin) 0;
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
