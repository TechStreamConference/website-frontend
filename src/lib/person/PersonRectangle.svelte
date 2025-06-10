<script lang="ts">
    import type {Person} from 'types/provideTypes';

    import SubHeadline from 'elements/text/subHeadline.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import LinkArray from './personLinkGrid.svelte';
    import Button from 'elements/input/button.svelte';
    import PersonImage from './personImage.svelte';

    export let classes: string = '';

    export let data: Person;

    function onLinkClicked(event: Event) {
        event.stopPropagation();
    }
</script>

<div class="person-rectangle {classes}"
     on:click
     role="presentation">
    <PersonImage classes="person-rectangle-picture"
                 {data}/>
    <SubHeadline classes="person-rectangle-margin">{data.name}</SubHeadline>
    <Paragraph classes="person-rectangle-paragraph person-rectangle-margin">{data.short_bio}</Paragraph>
    <div class="person-rectangle-line person-rectangle-margin"/>
    <div class="person-rectangle-margin">
        <LinkArray on:click={onLinkClicked}
                   person={data.name}
                   links={data.social_media_links}/>
    </div>
    <Button classes="person-rectangle-button person-rectangle-margin"
            buttonSize="small-button"
            on:click
            ariaLabel="Mehr Informationen zu {data.name}">
        Info
    </Button>
</div>

<style>
    .person-rectangle {
        display: grid;
        grid-template-rows: subgrid;
        grid-row: span 6;
        outline: 1px solid var(--primary-color-light);
        border-radius: var(--border-radius);
        text-align: center;
        gap: var(--2x-gap);
    }

    .person-rectangle:hover {
        outline: 1px solid var(--outline-hover-color);
        transition: var(--transition-duration);
    }

    :global(.person-rectangle-picture) {
        width: 100%;
        height: auto;
        background-color: var(--primary-color-light);
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
    }

    :global(.person-rectangle-paragraph) {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .person-rectangle-line {
        border-bottom: 1px solid var(--line-color);
    }

    :global(.person-rectangle-button) {
        margin-bottom: var(--full-margin);
        width: calc(100% - 2 * var(--full-margin));
    }

    :global(.person-rectangle-margin) {
        margin-left: var(--full-margin);
        margin-right: var(--full-margin);
    }
</style>
