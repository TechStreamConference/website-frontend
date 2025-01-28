<script lang="ts">
    import type { Person } from 'types/provideTypes';

    import Paragraph from 'elements/text/paragraph.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';
    import PersonLinkGrid from './personLinkGrid.svelte';
    import PersonImage from './personImage.svelte';
    import BasePopup from 'elements/popups/basePopup.svelte';

    export let data: Person | undefined = undefined;
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
                <Paragraph classes="paragraph-pre-wrap"
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
        margin:                var(--full-margin);
        display:               grid;
        grid-template-columns: 1fr 1fr;
        width:                 80vw;
        max-width:             100rem;
    }

    .person-popup-align-center {
        text-align: center;
    }

    .person-popup-column-wrapper {
        display:        flex;
        flex-direction: column;
        padding:        var(--2x-margin);
    }

    :global(.person-popup-one-line-spacer) {
        margin-top: var(--full-margin);
    }

    .person-popup-line {
        border-right: 1px solid var(--line-color);
    }

    :global(.person-popup-picture) {
        width:         100%;
        height:        auto;
        max-width:     30rem;
        border:        1px solid var(--primary-color-light);
        align-self:    center;
        border-radius: var(--border-radius);
    }

    @media (max-width: 1280px) {

        :global(.person-popup-picture) {
            max-width: 20rem;
        }
    }

    @media (max-width: 900px) {
        .person-popup-content-wrapper {
            grid-template-columns: 1fr;
            grid-auto-rows:        1fr;
            height:                75vh;
            overflow-y:            auto;
            max-width:             100%;
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
