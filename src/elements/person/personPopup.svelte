<script lang="ts">
	import { fade } from 'svelte/transition';
	import Line from 'elements/line/line.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';
	import SpacerOneLine from 'elements/spacer/spacerOneLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import PersonLinkGrid from './personLinkGrid.svelte';
	import type { Person } from 'types/provideTypes';
	import PersonImage from './personImage.svelte';
	import Button from 'elements/input/button.svelte';

	export let data: Person;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- No a11y correctnes here because the "close-button" already does the same. -->
<div class="page-wrapper" transition:fade={{ duration: 300 }} on:click>
	<div
		class="popup-wrapper"
		on:click={(event) => {
			event.stopPropagation();
		}}
	>
		<div class="content-wrapper">
			<div class="column-wrapper align-center">
				<PersonImage classes="person-popup-picture" {data} />
				<SpacerOneLine />
				<SubHeadline>{data.name}</SubHeadline>
				<Paragraph>{data.short_bio}</Paragraph>
				<Spacer --height="3rem" />
				<PersonLinkGrid />
			</div>
			<Line classes="personPopupLine" />
			<div class="column-wrapper">
				<SpacerOneLine />
				<Paragraph>{data.bio}</Paragraph>
			</div>

			<div class="flex-spacer" />
		</div>
	</div>
	<Button classes="close-button picture" on:click
		><img class="close-picture" src="/dummy_1_1.png" alt="" /></Button
	>
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
		border: 1px solid var(--primary-color);
		width: 60rem;
		height: 50rem;
	}

	.content-wrapper {
		margin: 1rem;
		display: flex;
		height: calc(100% - 2rem);
		justify-content: space-between;
	}

	.align-center {
		text-align: center;
	}

	.column-wrapper {
		width: 47%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.flex-spacer {
		flex-grow: 1;
		display: none;
	}

	:global(.personPopupLine) {
		height: 100%;
		width: 1px;
	}

	:global(.person-popup-picture) {
		width: auto;
		height: auto;
		border: 1px solid var(--primary-color);
	}

	:global(.close-button) {
		position: fixed;
		top: calc(50% - 25rem);
		left: calc(50% + 30rem);
		margin-left: 0.5rem;
	}

	.close-picture {
		height: 2rem;
		width: 2rem;
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

		.flex-spacer {
			display: flex;
		}

		:global(.personPopupLine) {
			width: 100%;
			height: 1px;
			margin: 2rem 0 1rem 0;
			flex-shrink: 0;
		}

		:global(.person-popup-picture) {
			max-width: 20rem;
			align-self: center;
		}

		:global(.close-button) {
			top: calc(100vh - 5rem);
		}
	}

	@media (max-width: 380px) {
		:global(.person-popup-picture) {
			max-width: 20rem;
			align-self: normal;
		}
	}
</style>
