<script lang="ts">
	import type { Speaker } from 'types/provideTypes';

	import SubHeadline from 'elements/text/subHeadline.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';

	import Spacer from 'elements/spacer/spacer.svelte';
	import LinkArray from './speakerLinkGrid.svelte';
	import HorizontalLine from 'elements/line/horizontalLine.svelte';
	import Button from 'elements/input/button.svelte';

	export let data: Speaker;

	function onLinkClicked(event: Event) {
		event.stopPropagation();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- No a11y correctnes here because the "speaker-button" already does the same. -->
<div class="speaker" on:click>
	<img class="picture" src="/dummy_1_1.png" alt="" />
	<Spacer --height="1rem" />
	<SubHeadline>{data.name} {data.id}</SubHeadline>
	<Paragraph>{data.short_bio}</Paragraph>
	<Spacer --height="3rem" />
	<div class="bottom-wrapper">
		<HorizontalLine />
		<Spacer --height="2rem" />
		<LinkArray on:click={onLinkClicked} /> <!--TODO: Add Social Media Links-->
		<Spacer --height="2rem" />
		<Button classes="speaker-button" on:click>Info</Button>
	</div>
</div>

<style>
	.speaker {
		min-width: 15rem;
		padding: 0;
		border: none;
		background-color: transparent;
		outline: 1px solid var(--primary-color);
		border-radius: var(--border-radius);
		transition: var(--transition-duration);
		text-align: center;
	}

	.speaker:hover {
		box-shadow: 4px 4px var(--gray-color);
		transform: translateY(-4px) translateX(-4px);
		transition: var(--transition-duration);
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
