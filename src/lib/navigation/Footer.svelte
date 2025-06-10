<script lang="ts">
    import type {Globals} from '@/types/provideTypes';
    import type {Menu} from '@/config/menu';

    import TextLine from '@/lib/text/TextLine.svelte';
    import Link from '@/lib/text/Link.svelte';
    import LogoBig from '@/lib/assets/LogoBig.svelte';
    import List from '@/lib/default/List.svelte';
    import ListElement from '@/lib/default/ListElement.svelte';
    import Paragraph from '@/lib/text/Paragraph.svelte';
    import {load_footer} from "@/loading/footer";

    export let classes: string = '';

    export let menu_logged_in: Menu;
    export let menu_logged_out: Menu;
    let globals: Globals;
    let logged_in: boolean;
    let is_finish_loading: boolean = false;

    const currentYear: number = new Date().getFullYear();

    async function load() {
        const loaded = await load_footer();
        logged_in = loaded.loggedIn;
        globals = loaded.globals;
        is_finish_loading = true;
    }

    load().catch();

</script>

<footer class={classes}>
    <div class="navigation-footer-wrapper">
        <nav class="navigation-footer-element">
            <TextLine classes={'text-line-white navigation-footer-font-size'}>Menu:</TextLine>
            <List classes="navigation-footer-list">
                {#if is_finish_loading}
                    {#each logged_in ? menu_logged_in : menu_logged_out as entry}
                        <ListElement>
                            <Link classes={'link-standard link-white navigation-footer-font-size'}
                                  href={entry.path}
                                  title={entry.aria}>
                                {entry.label}
                            </Link>
                        </ListElement>
                    {/each}
                {/if}
            </List>
        </nav>

        <nav class="navigation-footer-element">
            <TextLine classes={'text-line-white navigation-footer-font-size'}>Alle Events:</TextLine>
            <List classes="navigation-footer-list">
                {#if is_finish_loading}
                    {#each globals.years_with_events as number}
                        <ListElement>
                            <Link
                                    classes={'link-standard link-white navigation-footer-font-size'}
                                    href="/year/{number}"
                                    title="Tech Stream Conference Seite des Jahres {number} anschauen"
                            >
                                {number}
                            </Link>
                        </ListElement>
                    {/each}
                {/if}
            </List>
        </nav>

        <div class="navigation-footer-element">
            <Paragraph classes={'paragraph-white paragraph-pre-wrap navigation-footer-font-size'}>
                {#if is_finish_loading}
                    {globals.footer_text}
                {/if}
            </Paragraph>
        </div>

        <div class="navigation-footer-element">
            <LogoBig classes="navigation-footer-logo"/>
        </div>
    </div>
    <div class="navigation-footer-copyright">
        <TextLine classes={'text-line-white navigation-footer-font-size'}>&copy; Tech Stream
            Conference {currentYear}</TextLine>
    </div>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: column;
        background-color: var(--primary-color-light);
        padding: var(--2x-padding) 0;
    }

    .navigation-footer-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: var(--4x-gap);
        padding: 0 var(--4x-padding);
    }

    .navigation-footer-element {
        flex: 1;
        min-width: 18rem;
        text-align: center;
    }

    :global(.navigation-footer-list) {
        margin-top: var(--full-margin);
    }

    :global(.navigation-footer-logo) {
        height: 16rem;
        object-fit: contain;
        max-height: 20rem;
    }

    .navigation-footer-copyright {
        margin-top: var(--2x-margin);
        display: flex;
        justify-content: center;
    }

    :global(.navigation-footer-font-size) {
        font-size: var(--half-font-size) !important;
    }
</style>
