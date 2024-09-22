<script lang="ts">
	import { fade } from 'svelte/transition';
	import VerticalLine from 'elements/line/verticalLine.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';
	import SpacerOneLine from 'elements/spacer/spacerOneLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import PersonLinkGrid from './personLinkGrid.svelte';
	import type { Person } from 'types/provideTypes';
	import PersonImage from './personImage.svelte';

	export let data: Person;
</script>

<div class="page-wrapper" transition:fade={{ duration: 300 }} on:click>
	<div
		class="popup-wrapper"
		on:click={(event) => {
			event.stopPropagation();
		}}
	>
		<div class="content-wrapper">
			<div class="column-wrapper align-center">
				<PersonImage classes="person-popup-picture" {data}/>
				<SpacerOneLine />
				<SubHeadline>{data.name}</SubHeadline>
				<Paragraph>{data.short_bio}</Paragraph>
				<Spacer --height="3rem" />
				<PersonLinkGrid />
			</div>
			<VerticalLine />
			<div class="column-wrapper">
				<SpacerOneLine />
				<Paragraph>{data.bio}</Paragraph>
			</div>
		</div>
	</div>
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

	:global(.person-popup-picture) {
		width: auto;
		height: auto;
		border: 1px solid var(--primary-color);
	}
</style>
