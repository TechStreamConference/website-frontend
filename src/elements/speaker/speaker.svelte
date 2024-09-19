<script lang="ts">
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';

	import Spacer from 'elements/spacer/spacer.svelte';
	import LinkArray from './linkArray.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import Button from 'elements/input/button.svelte';
</script>

<button class="speaker">
	<img class="picture" src="/dummy_1_1.png" alt="" />
	<Spacer --height="1rem" />
	<SubHeadline>OwlOrientedProgramming</SubHeadline>
	<Paragraph>
		Ich mache das Beste, das wir je begenet ist. Ich bin doch länger. Viel zu lang um genau zu sein.
		LUL
	</Paragraph>
	<Spacer --height="3rem" />
	<div class="bottom-wrapper">
		<HorizontalLine />
		<Spacer --height="2rem" />
		<LinkArray />
		<Spacer --height="2rem" />
		<Button classes="speaker-button">Info</Button>
	</div>
</button>

<style>
	.speaker {
		min-width: 15rem;
		padding: 0;
		border: none;
		background-color: transparent;
		outline: 1px solid var(--primary-color);
		border-radius: var(--border-radius);
	}

	.picture {
		width: 100%;
		height: auto;
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
