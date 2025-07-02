<script lang="ts">
    import type { LoadYear } from 'types/loadTypes';

    import StyledLink from './styledLink.svelte';

    export let classes: string = '';

    export let data: LoadYear;
</script>

<div class="year-event-links-wrapper {classes}">
    {#if data.year.event.twitch_url}
        <StyledLink
                classes="styled-link-white"
                textClasses="hide-text-on-mobile"
                href={data.year.event.twitch_url}
                title="Klicke hier, um auf die Twitch-Seite der Tech Stream Conference zu gelangen"
                icon="Twitch"
                text="Schau zu"
        />
    {/if}
    {#if data.year.event.discord_url}
        <StyledLink
              classes="styled-link-white"
              textClasses="hide-text-on-mobile"
              href={data.year.event.discord_url}
              title="Klicke hier, um auf den Discord-Server der Tech Stream Conference zu gelangen"
              icon="Discord"
              text="Sei dabei"
        />
    {/if}
    {#if data.year.event.youtube_channel_url}
        <StyledLink
                classes="styled-link-white"
                textClasses="hide-text-on-mobile"
                href={data.year.event.youtube_channel_url}
                title="Klicke hier, um auf die YouTube-Seite der Tech Stream Conference zu gelangen"
                icon="YouTube"
                text="YouTube"
        />
    {/if}
    {#if data.year.event.presskit_url}
        <StyledLink
              classes="styled-link-white"
              textClasses="hide-text-on-mobile"
              href={data.year.event.presskit_url}
              title="Klicke hier, um das Presskit der Tech Stream Conference herunterzuladen"
              icon="Download"
              text="Presskit"
        />
    {/if}
</div>

<style>
    .year-event-links-wrapper {
        display:   flex;
        gap:       var(--full-gap);
        flex-wrap: wrap;
    }
</style>
