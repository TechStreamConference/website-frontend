<script lang="ts">
    import type { Globals } from 'types/provideTypes';

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { apiUrl } from 'helper/links';
    import { globalsDefault, globalsScheme } from 'types/provideTypes';
    import { parseProvidedJsonAsync } from 'helper/parseJson';
    import * as Menu from 'menu/page';

    import Header from 'elements/navigation/header.svelte';
    import Footer from 'elements/navigation/footer.svelte';
    import Button from 'elements/input/button.svelte';
    import HeadlinePage from 'elements/text/headlinePage.svelte';
    import SubHeadline from 'elements/text/subHeadline.svelte';

    let data: Globals = globalsDefault;

    onMount(async (): Promise<void> => {
        const handleFail = async (response: Response) => {
            console.error(await response.text());
        };

        try {
            // don't use `checkAndParseInputDataAsync<T>()` here because that could cause an `throw error(406)` loop
            const response: Response = await fetch(apiUrl('/globals'));
            if (!response.ok) {
                await handleFail(response);
                return;
            }

            const provided = await parseProvidedJsonAsync(response, globalsScheme);
            if (!provided) {
                await handleFail(response);
                return;
            }

            data = provided;
        } catch {
            return;
        }
    });

    function onClick() {
        goto('/');
    }
</script>

<Header menu={Menu.headerLoggedOut} />
<div class="wrapper page-404">
    <div class="content">
        <HeadlinePage classes="border">{$page.status}</HeadlinePage>
        {#if $page.error}
            {#if $page.status === 404}
                <SubHeadline classes="sub-headline">
                    Uuups! Die Seite konnte nicht gefunden werden 👻
                </SubHeadline>
            {:else}
                <SubHeadline classes="sub-headline">
                    Uuuups, irgendwas ist mächtig schief gelaufen, sorry! 🫨
                </SubHeadline>
            {/if}
        {/if}

        <Button classes="button"
                ariaLabel="Klicke um zur Hauptseite zu navigieren"
                on:click={onClick}>
            Hauptseite
        </Button>
    </div>
    <Footer menu={Menu.footerLoggedOut}
            globals={data} />
</div>

<style>
    .wrapper {
        display:        flex;
        flex-direction: column;
        min-height:     100vh;
    }

    .content {
        display:         flex;
        flex-direction:  column;
        justify-content: center;
        align-items:     center;
        flex-grow:       1;
    }

    .page-404 :global(.sub-headline) {
        margin-top: var(--2x-margin);
    }

    .page-404 :global(.button) {
        margin-top:    var(--4x-margin);
        margin-bottom: var(--4x-margin);
    }
</style>
