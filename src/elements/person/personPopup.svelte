<script lang="ts">
	import type { Person } from 'types/provideTypes';

	import Paragraph from 'elements/text/paragraph.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import PersonLinkGrid from './personLinkGrid.svelte';
	import PersonImage from './personImage.svelte';
	import Button from 'elements/input/button.svelte';

	import { fade } from 'svelte/transition';

	export let classes: string = '';

	export let data: Person;
</script>

<dialog class={classes} transition:fade={{ duration: 300 }} role="presentation" on:click>
	<div
		class="person-popup-wrapper"
		role="presentation"
		on:click={(event) => {
			event.stopPropagation();
		}}
	>
		<Button classes="person-popup-close-button" ariaLabel="close popup" on:click>
			<img class="person-popup-close-picture" src="/cross.png" alt="cross" />
		</Button>
		<div class="person-popup-content-wrapper">
			<div class="person-popup-column-wrapper person-popup-align-center person-popup-line">
				<PersonImage classes="person-popup-picture" {data} />
				<SubHeadline classes="person-popup-one-line-spacer">{data.name}</SubHeadline>
				<Paragraph classes="person-popup-short-bio-paragraph paragraph-pre-wrap"
					>{data.short_bio}</Paragraph
				>
				<PersonLinkGrid person={data.name} links={data.social_media_links} />
			</div>
			<div class="person-popup-column-wrapper">
				<Paragraph classes="person-popup-one-line-spacer">{data.bio}</Paragraph>
			</div>
		</div>
	</div>
</dialog>

<style>
	dialog {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		justify-content: center;
		align-items: center;
		background-color: var(--background-color-transparent);
		width: 100%;
		height: 100%;
		z-index: 1000;
	}

	.person-popup-wrapper {
		background-color: var(--background-color);
		border: 1px solid var(--primary-color-light);
		width: 90%;
		max-width: calc(100rem - 2 * var(--4x-margin));
		position: relative;
		border-radius: var(--border-radius);
	}

	.person-popup-content-wrapper {
		margin: var(--full-margin);
		display: flex;
	}

	.person-popup-align-center {
		text-align: center;
	}

	.person-popup-column-wrapper {
		width: 50%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		padding: var(--2x-margin);
	}

	:global(.person-popup-one-line-spacer) {
		margin-top: var(--full-margin);
	}

	:global(.person-popup-short-bio-paragraph) {
		flex-grow: 1;
	}

	.person-popup-line {
		border-right: 1px solid var(--line-color);
	}

	:global(.person-popup-picture) {
		width: auto;
		height: auto;
		max-width: 30rem;
		border: 1px solid var(--primary-color-light);
		align-self: center;
	}

	:global(.person-popup-close-button) {
		position: absolute;
		top: 0;
		right: 0;
		translate: 50% -50%;
	}

	.person-popup-close-picture {
		height: 2.5rem;
		width: 2.5rem;
		margin: var(--quad-margin);
	}

	@media (max-width: 1280px) {
		:global(.person-popup-close-button) {
			top: 100%;
			right: 50%;
		}

		:global(.person-popup-short-bio-paragraph) {
			flex-grow: unset;
		}

		:global(.person-popup-picture) {
			max-width: 20rem;
		}
	}

	@media (max-width: 900px) {
		.person-popup-wrapper {
			height: calc(100vh - 8rem);
		}

		.person-popup-content-wrapper {
			flex-direction: column;
			overflow: scroll;
			height: 95%;
		}

		.person-popup-column-wrapper {
			width: 100%;
			height: auto;
		}

		:global(.person-popup-picture) {
			max-width: 20rem;
			align-self: center;
		}

		:global(.person-popup-close-button) {
			top: 102%;
		}

		.person-popup-line {
			border-bottom: 1px solid var(--line-color);
			border-right: none;
		}
	}
</style>
