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

<dialog
	class="page-wrapper person-popup"
	transition:fade={{ duration: 300 }}
	role="presentation"
	on:click
>
	<div
		class="popup-wrapper"
		role="presentation"
		on:click={(event) => {
			event.stopPropagation();
		}}
	>
		<div class="content-wrapper">
			<div class="column-wrapper align-center line">
				<PersonImage classes="picture" {data} />
				<SubHeadline classes="one-line-spacer">{data.name}</SubHeadline>
				<Paragraph classes="paragraph pre-wrap">{data.short_bio}</Paragraph>
				<PersonLinkGrid person={data.name} links={data.social_media_links} />
			</div>
			<div class="column-wrapper">
				<Paragraph classes="one-line-spacer">{data.bio}</Paragraph>
			</div>
		</div>
	</div>
	<Button classes="close-button picture" ariaLabel="close popup" on:click>
		<img class="close-picture" src="/cross.png" alt="cross" />
	</Button>
</dialog>

<style>
    .page-wrapper {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        background-color: var(--background-color-transparent);
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
        margin: var(--full-margin);
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
        padding: var(--2x-margin);
    }

    .person-popup :global(.one-line-spacer) {
        margin-top: var(--full-margin);
    }

    .person-popup :global(.paragraph) {
        flex-grow: 1;
    }

    .line {
        border-right: 1px solid var(--line-color);
    }

    .person-popup :global(.picture) {
        width: auto;
        height: auto;
        border: 1px solid var(--primary-color-light);
    }

    .person-popup :global(.close-button) {
        position: fixed;
        top: calc(50% - 25rem);
        left: calc(50% + 30rem);
        margin-left: var(--half-margin);
    }

    .close-picture {
        height: 1.5rem;
        width: 1.5rem;
        margin: var(--quad-margin);
    }

    @media (max-width: 1280px) {
        .popup-wrapper {
            width: calc(100vw - 8rem);
            height: calc(100vh - 12rem);
        }

        .person-popup :global(.close-button) {
            top: calc(100vh - 6rem);
            left: calc(100vw - 50% - 1rem);
            margin-left: 0;
            margin-top: var(--full-margin);
        }

        .person-popup :global(.paragraph) {
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

        .person-popup :global(.picture) {
            max-width: 20rem;
            align-self: center;
        }

        .person-popup :global(.close-button) {
            top: calc(100vh - 5rem);
        }

        .line {
            border-bottom: 1px solid var(--line-color);
            border-right: none;
        }
    }

    @media (max-width: 380px) {
        .person-popup :global(.picture) {
            max-width: 20rem;
            align-self: normal;
        }
    }
</style>
