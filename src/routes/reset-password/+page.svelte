<script lang="ts">
    import * as Menu from 'menu/page';
    import * as MenuItem from 'menu/pageItems';

    import type { LoadResetPassword } from 'types/loadTypes';

    import { trySaveDataAsync } from 'helper/trySaveData.js';

    import Input from 'elements/input/input.svelte';
    import Button from 'elements/input/button.svelte';
    import PageWrapper from 'elements/section/pageWrapper.svelte';
    import PasswordHints from 'elements/text/passwordHints.svelte';
    import HeadlinePage from 'elements/text/headlinePage.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import StyledLink from 'elements/input/styledLink.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';

    enum State {
        DidReset,
        Default,
    }

    export let data: LoadResetPassword;
    let state: State = State.Default;

    let password1: string;
    let password2: string;
    let errorList: string[] = [];

    async function resetPassword(): Promise<void> {
        errorList = [];
        const trimmed_1 = password1.trim();
        const trimmed_2 = password2.trim();
        if (trimmed_1 !== trimmed_2) {
            errorList.push('Die Passwörter stimmen nicht überein');
            return;
        }

        const toSave   = {
            new_password: trimmed_1,
            token:        data.token,
        };
        const response = await trySaveDataAsync(fetch, toSave, '/account/reset-password', 'POST');

        errorList = response.messages;

        if (response.success) {
            state = State.DidReset;
        }
    }

</script>

<PageWrapper headerMenu={Menu.headerLoggedOut}
             footerMenu={Menu.footerLoggedOut}
             globals={data.globals}>
    {#if state === State.Default}
        <form on:submit|preventDefault={resetPassword}
              class="reset-password-wrapper">
            <HeadlinePage>Passwort zurücksetzen</HeadlinePage>
            <MessageWrapper messages={errorList} />
            <Input
                  classes="reset-password-input-line"
                  id="reset-password-input-line-1"
                  type="password"
                  labelText="Passwort:"
                  placeholderText="Passwort"
                  bind:value={password1}
                  ariaLabel="Gib das neue Passwort ein"
            />
            <Input
                  classes="reset-password-input-line"
                  id="reset-password-input-line-2"
                  type="password"
                  labelText="Passwort wiederholen:"
                  placeholderText="Passwort wiederholen"
                  bind:value={password2}
                  ariaLabel="Wiederhole das neue Passwort"
            />
            <Button
                  classes="reset-password-submit-button"
                  type={'submit'}
                  ariaLabel="Klicke hier, um dein Passwort zurückzusetzen"
            >
                Passwort zurücksetzen
            </Button>
            <PasswordHints />
        </form>
    {:else if state === State.DidReset}
        <div class="reset-password-wrapper">
            <HeadlinePage>Passwort geändert</HeadlinePage>
            <Paragraph classes="paragraph-pre-wrap"
                       --text-align="center">{"Dein Passwort wurde erfolgreich geändert.\nDu kannst dich nun mit deinem neuen Passwort anmelden."}</Paragraph>
        </div>
        <StyledLink classes="reset-password-submit-button"
                    text={MenuItem.login.name}
                    href={MenuItem.login.url}
                    title={MenuItem.login.description}
                    newTab={false} />
    {/if}
</PageWrapper>

<style>
    .reset-password-wrapper {
        display:         flex;
        flex-direction:  column;
        justify-content: center;
        padding:         var(--2x-padding);
        max-width:       100rem;
        margin:          0 auto;
        gap:             var(--full-gap)
    }

    :global(.reset-password-submit-button) {
        margin: 0 auto;
    }
</style>
