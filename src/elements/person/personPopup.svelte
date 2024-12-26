<script lang="ts">
    import type { Person } from 'types/provideTypes';

    import Paragraph from 'elements/text/paragraph.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import PersonLinkGrid from './personLinkGrid.svelte';
    import PersonImage from './personImage.svelte';
    import Button from 'elements/input/button.svelte';
    import BasePopup from 'elements/popups/basePopup.svelte';

    export let data: Person;
    let basePopup: BasePopup;

    export function show(person: Person): void {
        data = person;
        basePopup.show();
    }

    export function hide(): void {
        basePopup.hide();
    }
</script>

<BasePopup bind:this={basePopup}>
    <div class="person-popup-content-wrapper">
        {#if data}
            <div class="person-popup-column-wrapper person-popup-align-center person-popup-line">
                <PersonImage classes="person-popup-picture"
                             {data} />
                <SubHeadline classes="person-popup-one-line-spacer">{data.name}</SubHeadline>
                <Paragraph classes="person-popup-short-bio-paragraph paragraph-pre-wrap"
                >{data.short_bio}</Paragraph
                >
                <PersonLinkGrid person={data.name}
                                links={data.social_media_links} />
            </div>
            <div class="person-popup-column-wrapper">
                <Paragraph classes="person-popup-one-line-spacer paragraph-pre-wrap">{data.bio}</Paragraph>
            </div>
        {/if}
    </div>
</BasePopup>

<style>
    .person-popup-content-wrapper {
        margin:  var(--full-margin);
        display: flex;
    }

    .person-popup-align-center {
        text-align: center;
    }

    .person-popup-column-wrapper {
        width:          50%;
        height:         fit-content;
        display:        flex;
        flex-direction: column;
        padding:        var(--2x-margin);
    }

    :global(.person-popup-one-line-spacer) {
        margin-top: var(--full-margin);
    }

    :global(.person-popup-short-bio-paragraph) {
        flex-grow: 1;
    }

    .person-popup-line {
        border-right: 1px solid var(--line-color);
    }

    :global(.person-popup-picture) {
        width:      auto;
        height:     auto;
        max-width:  30rem;
        border:     1px solid var(--primary-color-light);
        align-self: center;
    }

    @media (max-width: 1280px) {
        :global(.person-popup-short-bio-paragraph) {
            flex-grow: unset;
        }

        :global(.person-popup-picture) {
            max-width: 20rem;
        }
    }

    @media (max-width: 900px) {
        .person-popup-content-wrapper {
            flex-direction: column;
            overflow:       scroll;
            height:         95%;
        }

        .person-popup-column-wrapper {
            width:  100%;
            height: auto;
        }

        :global(.person-popup-picture) {
            max-width:  20rem;
            align-self: center;
        }

        .person-popup-line {
            border-bottom: 1px solid var(--line-color);
            border-right:  none;
        }
    }
</style>
