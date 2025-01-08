<script lang="ts">
    import * as Menu from 'menu/resetPassword';
    import * as MenuItem from 'menu/menuItems';

    import type { LoadResetPassword } from 'types/loadTypes';

    import { apiUrl } from 'helper/links';

    import Input from 'elements/input/input.svelte';
    import Button from 'elements/input/button.svelte';
    import PageWrapper from 'elements/section/pageWrapper.svelte';
    import PasswordHints from 'elements/text/passwordHints.svelte';
    import HeadlinePage from 'elements/text/headlinePage.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import StyledLink from 'elements/input/styledLink.svelte';
    import Message from 'elements/text/message.svelte';
    import { registerLookup } from 'lookup/registerLookup.js';

    enum State {
        Resettet,
        Default,
    }

    export let data: LoadResetPassword;
    let state: State = State.Default;

    let password1: string;
    let password2: string;
    let errorMessages: string[]  = [];

    async function resetPassword(): Promise<void> {
        errorMessages = [];
        const trimmed_1 = password1.trim();
        const trimmed_2 = password2.trim();
        if (trimmed_1 !== trimmed_2) {
            errorMessages.push('Die Passwörter stimmen nicht überein');
            return;
        }

        const toSave   = {
            new_password: trimmed_1,
            token:        data.token,
        };
        const response = await fetch(apiUrl('/api/account/reset-password'), {
            method: 'POST',
            body:   JSON.stringify(toSave),
        });

        if (!response.ok) {
            const entriesAsync = async (response: Response): Promise<string[]> => {
                const text: string     = await response.text();
                const json: {
                    [key: string]: string
                }                      = JSON.parse(text);
                const values: string[] = Object.values(json);
                let toReturn: string[] = [];
                for (const value of values) {
                    toReturn.push(registerLookup(value));
                    console.error('error while register from dashboard: ' + value);
                }
                return toReturn;
            };
            errorMessages      = await entriesAsync(response);
            return;
        }

        state        = State.Resettet;
    }

</script>

<PageWrapper headerMenu={Menu.header}
             footerMenu={Menu.footer}
             globals={data.globals}>
    {#if state === State.Default}
        <form on:submit|preventDefault={resetPassword}
              class="reset-password-wrapper">
            <HeadlinePage>Passwort zurücksetzen</HeadlinePage>
            {#each errorMessages as message}
                <Message {message} />
            {/each}
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
                  ariaLabel="Klicke hier, um dein Passwort zurück zu setzen"
            >
                Passwort zurücksetzen
            </Button>
            <PasswordHints />
        </form>
    {:else if state === State.Resettet}
        <div class="reset-password-wrapper">
            <HeadlinePage>Passwort zurückgesetzt</HeadlinePage>
            <Paragraph classes="paragraph-pre-wrap"
                       --text-align="center">{"Dein Passwort wurde erfolgreich zurück gesetzt.\nDu kannst dich nun mit deinem neuen Passwort anmelden."}</Paragraph>
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
