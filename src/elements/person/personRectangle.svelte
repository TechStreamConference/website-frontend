<script lang="ts">
	import type { Person } from 'types/provideTypes';

	import SubHeadline from 'elements/text/subHeadline.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';

	import LinkArray from './personLinkGrid.svelte';
	import Button from 'elements/input/button.svelte';
	import PersonImage from './personImage.svelte';

	export let data: Person;

	function onLinkClicked(event: Event) {
		event.stopPropagation();
	}
</script>

<div class="person person-rectangle" on:click role="presentation">
	<PersonImage classes="picture" {data} />
	<div class="text-wrapper">
		<SubHeadline>{data.name}</SubHeadline>
		<Paragraph classes="paragraph">{data.short_bio}</Paragraph>
	</div>
	<div class="flex-growth" />
	<div class="bottom-wrapper">
		<LinkArray on:click={onLinkClicked} person={data.name} links={data.social_media_links} />
	</div>
	<Button classes="button text" on:click ariaLabel="Mehr Informationen zu {data.name}">
		Info
	</Button>
</div>

<style>
    .person {
        display: flex;
        flex-direction: column;
        min-width: 15rem;
        border: none;
        background-color: transparent;
        outline: 1px solid var(--primary-color-light);
        border-radius: var(--border-radius);
        transition: var(--transition-duration);
        text-align: center;
    }

    .person:hover {
        outline: 1px solid var(--white-color);
        transition: var(--transition-duration);
    }

    .person-rectangle :global(.picture) {
        width: 100%;
        height: auto;
        background-color: var(--primary-color-light);
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
        margin-bottom: var(--full-margin);
    }

    .text-wrapper {
        height: 7rem;
        margin: 0 var(--half-margin);
    }

    .person-rectangle :global(.paragraph) {
        margin-top: var(--half-margin);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .flex-growth {
        flex-grow: 1;
        margin: var(--2x-margin) var(--2x-margin) 0;
        border-top: 1px solid var(--line-color);
    }

    .bottom-wrapper {
        margin: var(--2x-margin) var(--2x-margin) 0;
    }

    .person-rectangle :global(.button) {
        display: block;
        padding: var(--quad-padding) var(--2x-padding) !important;
        margin: 0 var(--2x-margin) var(--2x-margin) var(--2x-margin) !important;
    }
</style>
