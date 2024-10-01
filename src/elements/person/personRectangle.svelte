<script lang="ts">
	import type { Person } from 'types/provideTypes';

	import SubHeadline from 'elements/text/subHeadline.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';

	import LinkArray from './personLinkGrid.svelte';
	import Button from 'elements/input/button.svelte';
	import PersonImage from './personImage.svelte';

	export let data: Person;

	function onLinkClicked(event: Event) {
		event.stopPropagation();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- No a11y correctness here because the "person-button" already does the same. -->
<div class="person" on:click>
	<PersonImage classes="person-rectangle-picture" {data} />
	<div class="text-wrapper">
		<SubHeadline>{data.name}</SubHeadline>
		<Paragraph classes="person-rectangle-paragraph">{data.short_bio}</Paragraph>
	</div>
	<div class="flex-groth" />
	<div class="bottom-wrapper">
		<LinkArray on:click={onLinkClicked} person={data.name} />
		<!--TODO: Add Social Media Links-->
	</div>
	<Button classes="person-button text" on:click ariaLabel="Mehr Informationen zu {data.name}">
		Info
	</Button>
</div>

<style>
	.person {
		display: flex;
		flex-direction: column;
		min-width: 15rem;
		border: none;
		background-color: transparent;
		outline: 1px solid var(--primary-color-light);
		border-radius: var(--border-radius);
		transition: var(--transition-duration);
		text-align: center;
	}

	.person:hover {
		outline: 1px solid var(--white-color);
		transition: var(--transition-duration);
	}

	:global(.person-rectangle-picture) {
		width: 100%;
		height: auto;
		background-color: var(--primary-color-light);
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
		margin-bottom: 1rem;
	}

	.text-wrapper {
		height: 7rem;
		margin: 0 0.5rem;
	}

	:global(.person-rectangle-paragraph) {
		margin-top: 0.5rem;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.flex-groth {
		flex-grow: 1;
		margin: 2rem 2rem 0 2rem;
		border-top: 1px solid var(--line-color);
	}

	.bottom-wrapper {
		margin: 2rem 2rem 0 2rem;
	}

	:global(.person-button) {
		display: block;
		padding: 0.2rem 2rem !important;
		margin: 0 2rem 2rem 2rem !important;
	}
</style>
