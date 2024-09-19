<script lang="ts">
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import TextLine from 'elements/text/textLine.svelte';

	import Spacer from 'elements/spacer/spacer.svelte';
	import LinkArray from './linkArray.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import Button from 'elements/input/button.svelte';
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
		<LinkArray/>
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
        border-radius: var(--border-radius);
	}

	.picture {
		width: auto;
		height: 25rem;
		background-color: var(--primary-color);
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
	}

	.bottom-wrapper {
		margin: 2rem;
	}

	:global(.speaker-button) {
		width: 100%;
		padding: 0.2rem 2rem !important;
	}
</style>
