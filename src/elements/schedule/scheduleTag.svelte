<script lang="ts">
	import TextLine from 'elements/text/textLine.svelte';
	import { onMount } from 'svelte';
	import type { TalkTag } from 'types/provideTypes';
	import { tagColorLookup, tagTextColorLookup } from 'lookup/tagColorLookup';

	export let tag: TalkTag;

	onMount(() => {
		const element = document.getElementsByClassName(`schedule-tag-${tag.text}`);

		Array.from(element).forEach((element) => {
			(element as HTMLElement).style.backgroundColor = tagColorLookup(tag.color_index);
			(element as HTMLElement).style.color = tagTextColorLookup(tag.color_index);
		});
	});
</script>

<div class="schedule-entry">
	<TextLine classes="schedule-tag-{tag.text} tag">
		{tag.text}
	</TextLine>
</div>

<style>
	.schedule-entry :global(.tag) {
		border-radius: var(--border-radius);
		padding: 0.1rem 0.3rem 0.1rem 0.3rem;
		margin: 0.2rem 0.3rem 0.2rem 0.3rem;
	}
</style>
