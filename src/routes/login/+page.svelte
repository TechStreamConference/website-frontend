<script lang="ts">
    import type { LoadLogin } from 'types/loadTypes';

    import * as Menu from 'menu/login';
    import Header from 'elements/navigation/header.svelte';
    import HeadlinePage from 'elements/text/headlinePage.svelte';
    import Footer from 'elements/navigation/footer.svelte';
    import ErrorMessage from 'elements/text/message.svelte';
    import Input from 'elements/input/input.svelte';
    import Button from 'elements/input/button.svelte';
    import Link from 'elements/text/link.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';

    import { goto } from '$app/navigation';
    import { apiUrl } from 'helper/links';
    import { loginLookup } from 'lookup/loginLookup';

    export let data: LoadLogin; // data from database

    enum State {
        Login,
        ResetPasswordPending,
        ResetPasswordSuccess,
    }

    let state: State = State.Login;

    let usernameOrEmail: string = '';
    let password: string        = '';

    const loggedInMessage     = data.loggedIn ? 'Du bist bereits angemeldet.' : '';
    const displayLoginMessage = data.showLoginMessage ? 'Du musst dich zunächst anmelden.' : '';
    let errorMessage: string  = '';

    function changeState(_state: State): void {
        errorMessage = '';
        state        = _state;
    }

    async function loginAsync(): Promise<void> {
        const data = {
            username_or_email: usernameOrEmail.trim(),
            password:          password.trim(),
        };

        const response: Response = await fetch(apiUrl('/api/account/login'), {
            method: 'POST',
            body:   JSON.stringify(data),
        });

        if (response.ok) {
            await goto('/dashboard');
            return;
        }

        const entriesAsync = async (response: Response): Promise<string> => {
            const text: string = await response.text();
            const json: {
                [key: string]: string
            }                  = JSON.parse(text);
            return loginLookup(Object.values(json)[0]);
        };
        errorMessage       = await entriesAsync(response);
    }

    async function resetPassword(): Promise<void> {
        changeState(State.ResetPasswordSuccess);
    }
</script>

<Header menu={Menu.headerOut} />

<div class="login">
    <div class="login-content">
        {#if state === State.Login}
            <form class="login-form-width-wrapper"
                  on:submit|preventDefault={loginAsync}>
                <HeadlinePage>Anmelden</HeadlinePage>
                <div class="login-message-wrapper">
                    <ErrorMessage message={loggedInMessage} />
                    <ErrorMessage message={displayLoginMessage} />
                    <ErrorMessage message={errorMessage} />
                </div>
                <Input
                      classes="login-username-mail"
                      id="login-username-or-email"
                      type="text"
                      labelText="Nutzername oder E-Mail:"
                      placeholderText="Nutzername oder E-Mail"
                      ariaLabel="Gib den Nutzernamen oder die E-Mail ein"
                      bind:value={usernameOrEmail}
                />
                <Input
                      classes="login-password"
                      id="login-password"
                      type="password"
                      labelText="Passwort:"
                      placeholderText="Passwort"
                      ariaLabel="Gib das Passwort ein"
                      bind:value={password}
                />
                <Link href="/register"
                      title="Klicke, um einen neuen Account anzulegen">
                    Noch keinen Account?
                </Link>
                <Link href="#"
                      title="Klicke, um dein Passwort zurück zu setzen."
                      on:click={() => {changeState(State.ResetPasswordPending)}}
                >
                    Passwort vergessen?
                </Link>
                <Button classes="login-button"
                        type="submit"
                        ariaLabel="Klicke zum Anmelden">Anmelden
                </Button>
            </form>
        {:else if state === State.ResetPasswordPending}
            <form class="login-form-width-wrapper"
                  on:submit|preventDefault={resetPassword}>
                <HeadlinePage>Passwort zurücksetzen</HeadlinePage>
                <ErrorMessage message={errorMessage} />
                <Input
                      classes="login-username-mail login-username-mail-reset-extra"
                      id="login-username-or-email"
                      type="text"
                      labelText="Nutzername oder E-Mail:"
                      placeholderText="Nutzername oder E-Mail"
                      ariaLabel="Gib den Nutzernamen oder die E-Mail ein"
                      bind:value={usernameOrEmail}
                />
                <Button classes="login-button"
                        type="submit"
                        ariaLabel="Klicke, um dein Passwort zurückzusetzen">Passwort zurücksetzen
                </Button>
                <Link href="#"
                      title="Klicke, wieder zum login zu kommen."
                      on:click={() => {changeState(State.Login)}}
                >
                    zurück
                </Link>
            </form>
        {:else if state === State.ResetPasswordSuccess}
            <form class="login-form-width-wrapper login-form-gap-wrapper"
                  on:submit|preventDefault={() => {changeState(State.Login);}}>
                <HeadlinePage>Passwort zurückgesetzt</HeadlinePage>
                <Paragraph classes="paragraph-pre-wrap"
                           --text-align="center">{'Dein Passwort wurde erfolgreich zurück gesetzt.\nDu erhältst eine Mail mit einem Link.\nDort kannst du dein neues Passwort eingeben.\nDanach kannst du dich mit deinem neuen Passwort wieder anmelden.'}</Paragraph>
                <Button classes="login-button"
                        type="submit"
                        ariaLabel="Klicke, um dich anzumelden">Login
                </Button>
            </form>
        {/if}
    </div>

    <Footer globals={data.globals}
            menu={Menu.footerOut} />
</div>

<style>
    .login {
        display:        flex;
        flex-direction: column;
        min-height:     100vh;
    }

    .login-content {
        flex-grow:      1;
        display:        flex;
        flex-direction: column;
        margin:         0 var(--2x-margin);
    }

    .login-form-width-wrapper {
        width:          100%;
        max-width:      50rem;
        margin:         0 auto;
        display:        flex;
        flex-direction: column;
    }

    .login-form-gap-wrapper {
        gap: var(--4x-gap);
    }

    .login-message-wrapper {
        display:        flex;
        flex-direction: column;
        margin:         var(--2x-margin) auto;
    }

    :global(.login-username-mail) {
        margin-bottom: var(--full-margin);
    }

    :global(.login-username-mail-reset-extra) {
        margin-top: var(--4x-margin);
    }

    :global(.login-password) {
        margin-bottom: var(--full-margin);
    }

    :global(.login-button) {
        margin: var(--2x-margin) auto var(--4x-margin);
    }

    @media (max-width: 1280px) {
        .login-form-width-wrapper {
            max-width: 50rem;
        }
    }
</style>
