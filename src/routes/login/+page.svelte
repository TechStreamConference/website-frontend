<script lang="ts">
    import * as Menu from 'menu/login';

    import type { LoadLogin } from 'types/loadTypes';

    import HeadlinePage from 'elements/text/headlinePage.svelte';
    import ErrorMessage from 'elements/text/message.svelte';
    import Input from 'elements/input/input.svelte';
    import Button from 'elements/input/button.svelte';
    import Link from 'elements/text/link.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import PageWrapper from 'elements/section/pageWrapper.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';

    import { goto } from '$app/navigation';
    import { trySaveDataAsync } from 'helper/trySaveDashboardData';

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
    let errorQueue: string[]  = [];

    function changeState(_state: State): void {
        errorQueue = [];
        state      = _state;
    }

    async function loginAsync(): Promise<void> {
        const data = {
            username_or_email: usernameOrEmail.trim(),
            password:          password.trim(),
        };

        const result = await trySaveDataAsync(data, '/api/account/login', 'POST');

        if (result.success) {
            await goto('/dashboard');
            return;
        }

        errorQueue = result.messages;
    }

    async function resetPassword(): Promise<void> {
        const data = {
            username_or_email: usernameOrEmail.trim(),
        };

        if (data.username_or_email.length === 0) {
            errorQueue = ['Keine E-Mail-Adresse oder Name angegeben.'];
            return;
        }

        const result = await trySaveDataAsync(data, '/api/account/forgot-password', 'POST');

        errorQueue = result.messages;
        if (result.success) {
            changeState(State.ResetPasswordSuccess);
        }
    }
</script>


<PageWrapper headerMenu={Menu.headerOut}
             footerMenu={Menu.footerOut}
             globals={data.globals}>
    {#if state === State.Login}
        <form class="login-form-width-wrapper"
              on:submit|preventDefault={loginAsync}>
            <HeadlinePage>Anmelden</HeadlinePage>
            <div class="login-message-wrapper">
                <ErrorMessage message={loggedInMessage} />
                <ErrorMessage message={displayLoginMessage} />
                <MessageWrapper messages={errorQueue} />
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
                  title="Klicke, um dein Passwort zurückzusetzen."
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
            <MessageWrapper messages={errorQueue} />
            <Input
                  classes="login-username-mail login-username-mail-reset-extra"
                  id="login-username-or-email"
                  type="text"
                  labelText="Nutzername oder E-Mail:"
                  placeholderText="Nutzername oder E-Mail"
                  ariaLabel="Gib den Nutzernamen oder die E-Mail-Adresse ein"
                  bind:value={usernameOrEmail}
            />
            <Button classes="login-button"
                    type="submit"
                    ariaLabel="Klicke, um dein Passwort zurückzusetzen">Passwort zurücksetzen
            </Button>
            <Link href="#"
                  title="Klicke, um wieder zur Anmeldung zu kommen."
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
                       --text-align="center">{'Wir haben dir eine E-Mail gesendet. Darin findest du einen Link, mit dessen Hilfe du ein neues Passwort auswählen kannst.\nDanach kannst du dich mit deinem neuen Passwort wieder anmelden.'}</Paragraph>
            <Button classes="login-button"
                    type="submit"
                    ariaLabel="Klicke, um dich anzumelden">Login
            </Button>
        </form>
    {/if}
</PageWrapper>

<style>
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
