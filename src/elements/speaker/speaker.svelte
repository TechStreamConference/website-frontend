<script lang="ts">
	import type { IconLink } from 'types/provideTypes';

	import SubHeadline from 'elements/text/subHeadline.svelte';
	import TextLine from 'elements/text/textLine.svelte';

	import Spacer from 'elements/spacer/spacer.svelte';
	import LinkArray from './linkArray.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import Button from 'elements/input/button.svelte';

	export let links: IconLink[];
</script>

<button class="speaker">
	<img class="picture" src="/dummy_1_1.png" alt="" />
	<Spacer --height="1rem" />
	<SubHeadline>OwlOrientedProgramming</SubHeadline>
	<TextLine>Ich mache das Beste, das wir je begenet ist</TextLine>
	<Spacer --height="3rem" />
	<div class="bottom-wrapper">
		<HorizontalLine />
		<Spacer --height="2rem" />
		<LinkArray {links} />
		<Spacer --height="2rem" />
		<Button classes="speaker-button">Info</Button>
	</div>
</button>

<style>
	.speaker {
		width: 25rem;
		padding: 0;
		border: none;
		background-color: transparent;
		outline: 1px solid var(--primary-color);
        border-radius: 6px;
	}

	.picture {
		width: auto;
		height: 25rem;
		background-color: var(--primary-color);
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
	}

	.bottom-wrapper {
		margin: 1rem;
	}

	:global(.speaker-button) {
		width: 100%;
		padding: 0.2rem 2rem !important;
	}
</style>
