<script lang="ts">
	import { fade } from 'svelte/transition';
	import Paragraph from 'elements/text/paragraph.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import PersonLinkGrid from './personLinkGrid.svelte';
	import type { Person } from 'types/provideTypes';
	import PersonImage from './personImage.svelte';
	import Button from 'elements/input/button.svelte';

	export let data: Person;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- No a11y correctness here because the "close-button" already does the same. -->
<div class="page-wrapper" transition:fade={{ duration: 300 }} aria-hidden="true" on:click>
	<div
		class="popup-wrapper"
		aria-hidden="true"
		on:click={(event) => {
			event.stopPropagation();
		}}
	>
		<div class="content-wrapper">
			<div class="column-wrapper align-center line">
				<PersonImage classes="person-popup-picture" {data} />
				<SubHeadline classes="person-popup-one-line-spacer">{data.name}</SubHeadline>
				<Paragraph classes="person-popup-paragraph">{data.short_bio}</Paragraph>
				<PersonLinkGrid person={data.name} />
			</div>
			<div class="column-wrapper">
				<Paragraph classes="person-popup-one-line-spacer">{data.bio}</Paragraph>
			</div>
		</div>
	</div>
	<Button classes="close-button picture" ariaLabel="close popup" on:click>
		<img class="close-picture" src="/cross.png" alt="cross" />
	</Button>
</div>

<style>
	.page-wrapper {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		justify-content: center;
		align-items: center;
		background-color: var(--background-light-color);
		width: 100%;
		height: 100%;
		z-index: 1000;
	}

	.popup-wrapper {
		background-color: var(--background-color);
		border: 1px solid var(--primary-color-light);
		width: 60rem;
		height: 50rem;
	}

	.content-wrapper {
		margin: 1rem;
		display: flex;
		height: calc(100% - 2rem);
	}

	.align-center {
		text-align: center;
	}

	.column-wrapper {
		width: 50%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		padding: 2rem;
	}

	:global(.person-popup-one-line-spacer) {
		margin-top: 1rem;
	}

	:global(.person-popup-paragraph) {
		flex-grow: 1;
	}

	.line {
		border-right: 1px solid var(--lines-color);
	}

	:global(.personPopupLine) {
		height: 100%;
		width: 1px;
	}

	:global(.person-popup-picture) {
		width: auto;
		height: auto;
		border: 1px solid var(--primary-color-light);
	}

	:global(.close-button) {
		position: fixed;
		top: calc(50% - 25rem);
		left: calc(50% + 30rem);
		margin-left: 0.5rem;
	}

	.close-picture {
		height: 1.5rem;
		width: 1.5rem;
		margin: 0.25rem;
	}

	@media (max-width: 1280px) {
		.popup-wrapper {
			width: calc(100vw - 8rem);
			height: calc(100vh - 12rem);
		}

		:global(.close-button) {
			top: calc(100vh - 6rem);
			left: calc(100vw - 50% - 1rem);
			margin-left: 0;
			margin-top: 1rem;
		}

		:global(.person-popup-paragraph) {
			flex-grow: unset;
		}
	}

	@media (max-width: 700px) {
		.popup-wrapper {
			width: calc(100vw - 2rem);
			height: calc(100vh - 10rem);
		}

		.content-wrapper {
			flex-direction: column;
			overflow: scroll;
		}

		.column-wrapper {
			width: 100%;
			height: auto;
		}

		:global(.personPopupLine) {
			width: 100%;
			height: 1px;
			margin: 2rem 0 1rem 0;
		}

		:global(.person-popup-picture) {
			max-width: 20rem;
			align-self: center;
		}

		:global(.close-button) {
			top: calc(100vh - 5rem);
		}

		.line{
			border-bottom: 1px solid var(--lines-color);
		}
	}

	@media (max-width: 380px) {
		:global(.person-popup-picture) {
			max-width: 20rem;
			align-self: normal;
		}
	}
</style>
