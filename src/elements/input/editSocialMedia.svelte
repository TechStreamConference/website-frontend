<script lang="ts">
    import type {
        DashboardAllSocialMediaLinks, DashboardSocialMediaLink,
    } from 'types/dashboardProvideTypes';

    import DropDown from './dropDown.svelte';
    import Input from './input.svelte';
    import StyledLink from './styledLink.svelte';
    import Button from './button.svelte';
    import Icon from 'elements/image/icon.svelte';
    import Tooltip from 'elements/text/tooltip.svelte';
    import TextLine from 'elements/text/textLine.svelte';

    export let links: DashboardAllSocialMediaLinks;
    export let deleteCallback: (id: number) => void;
    export let socialMediaTypes: string[];

    function onInput(link: DashboardSocialMediaLink) {
        link.approved = false;
    }
</script>

<div class="edit-social-media-links-wrapper">
    {#each links as link, index}
        <StyledLink
                href={link.url}
                icon={link.name}
                title="Klicke um zur url von {link.name} zu navigieren"
                classes="edit-social-media-links-link"
        />
        <DropDown
                id="edit-social-media-links-icon-{index}"
                labelText="Link-Art:"
                data={socialMediaTypes}
                bind:selected={link.name}
                on:input={() => {
				onInput(link);
			}}
                on:submit
        />
        <div class="edit-social-media-input-wrapper">
            <Input
                    id="edit-social-media-links-link-{index}"
                    labelText="Link-URL:"
                    placeholderText="Link-URL"
                    bind:value={link.url}
                    ariaLabel="Trage die URL für {link.name} ein"
                    on:input={() => {
				onInput(link);
			}}
            />
        </div>
        <div class="status-wrapper">
            <TextLine>Status:</TextLine>
            {#if link.approved}
                <Tooltip
                        classes="edit-social-media-links-approval-icon"
                        tooltip="Dieser Link ist freigegeben."
                        ariaLabel="Dieser Link ist freigegeben."
                >
                    <Icon type="CircleCheck"
                          color="green"/>
                </Tooltip>
            {:else if link.requested_changes}
                <Tooltip
                        classes="edit-social-media-links-approval-icon"
                        tooltip={`Änderungswünsche:\n${link.requested_changes}`}
                        ariaLabel={`Änderungswünsche: ${link.requested_changes}`}
                >
                    <Icon type="CircleCross"
                          color="red"/>
                </Tooltip>
            {:else}
                <Tooltip
                        classes="edit-social-media-links-approval-icon"
                        tooltip={'Dieser Link muss noch Freigegeben werden.\nDerzeit gibt es keine Änderungswünsche.'}
                        ariaLabel="Dieser Link muss noch Freigegeben werden. Derzeit gibt es keine Änderungswünsche."
                >
                    <Icon type="Clock"
                          color="orange"/>
                </Tooltip>
            {/if}
        </div>
        <Button
                buttonSize="small-button"
                ariaLabel="Klicke hier um diesen Eintrag zu löschen."
                classes="edit-social-media-links-link"
                on:click={() => {
				deleteCallback(index);
			}}>Löschen
        </Button
        >
    {/each}
</div>

<style>
    .edit-social-media-links-wrapper {
        display: grid;
        grid-template-columns: auto 1fr 1fr auto auto;
        gap: var(--2x-gap);
    }

    .edit-social-media-input-wrapper {
        display: flex;
        flex-direction: row;
        align-items: end;
    }

    .status-wrapper {
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    :global(.edit-social-media-links-link) {
        margin: auto auto 0 auto;
    }

    :global(.edit-social-media-links-approval-icon) {
        margin: auto auto 0.8rem auto;
    }
</style>
