<script lang="ts">
	import type { Speaker } from 'types/provideTypes';
	import SpeakerRectangle from './speakerRectangle.svelte';
	export let speakerData: Speaker[];

	export let speakerPopupCallback: (event: Event, speaker: Speaker) => void;
</script>

<div class="speaker-wrapper">
	{#each speakerData as speaker}
		<SpeakerRectangle
			data={speaker}
			on:click={(event) => {
				speakerPopupCallback(event, speaker);
			}}
		/>
	{/each}
</div>

<style>
	.speaker-wrapper {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem;
		justify-items: center;
	}

	@media (max-width: 1280px) {
		.speaker-wrapper {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.speaker-wrapper {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
