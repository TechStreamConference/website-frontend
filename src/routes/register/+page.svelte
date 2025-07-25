<script lang="ts">
    import * as Validators from './validation';
    import * as Menu from 'menu/page';

    import type {LoadRegister} from 'types/loadTypes';

    import {trySaveDataAsync} from 'helper/trySaveData.js';
    import {setFocus} from 'helper/basic';
    import {onMount} from 'svelte';

    import HeadlinePage from 'elements/text/headlinePage.svelte';
    import ErrorMessage from 'elements/text/message.svelte';
    import Input from 'elements/input/input.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import Button from 'elements/input/button.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';
    import PageWrapper from 'elements/section/pageWrapper.svelte';
    import PasswordHints from 'elements/text/passwordHints.svelte';
    import MessageWrapper from 'elements/text/messageWrapper.svelte';

    export let data: LoadRegister; // data from database

    let timerUsername: number | null = null;
    let timerEmail: number | null = null;
    let timerPassword: number | null = null;

    let timerUsernameRef = {current: timerUsername};
    let timerEmailRef = {current: timerEmail};
    let timerPasswordRef = {current: timerPassword};

    let username: string = '';
    let email: string = '';
    let password_1: string = '';
    let password_2: string = '';

    const loggedInMessage = data.loggedIn ? 'Du bist bereits angemeldet' : '';
    let usernameMessage: string = '';
    let emailMessage: string = '';
    let passwordMessage: string = '';
    let errorList: string[] = [''];

    let registered: boolean = false;

    onMount(() => {
        setFocus("register-username");
    })

    function startTimer(timer: {
        current: number | null
    }, callback: () => void, time: number): void {
        if (timer.current !== null) {
            clearTimeout(timer.current);
            timer.current = null;
        }
        timer.current = setTimeout(() => {
            callback();
        }, time);
    }

    function startPasswordTimer() {
        const isSecondShorter = password_1.trim().length > password_2.trim().length;
        if (isSecondShorter) {
            startTimer(timerPasswordRef, onPasswordChanged, 500);
            return;
        }

        if (timerPassword) {
            clearTimeout(timerPassword);
            timerPassword = null;
        }

        onPasswordChanged();
    }

    async function onUsernameChangedAsync(): Promise<void> {
        const result = await Validators.onUsernameChangedAsync(username, fetch);
        usernameMessage = result ? result : '';
    }

    async function onEmailChangedAsync(): Promise<void> {
        const result = await Validators.onMailChangedAsync(email, fetch);
        emailMessage = result ? result : '';
    }

    function onPasswordChanged(): void {
        const result = Validators.onPasswordChanged(password_1, password_2);
        passwordMessage = result ? result : '';
    }

    async function tryRegisterAsync(): Promise<void> {
        const namePromise = Validators.onUsernameChangedAsync(username, fetch);
        const mailPromise = Validators.onMailChangedAsync(email, fetch);

        const passwordResult = Validators.onPasswordChanged(password_1, password_2);

        const nameResult = await namePromise;
        const mailResult = await mailPromise;

        errorList = [];
        usernameMessage = nameResult ? nameResult : '';
        emailMessage = mailResult ? mailResult : '';
        passwordMessage = passwordResult ? passwordResult : '';

        if (nameResult || mailResult || passwordResult) {
            return;
        }

        await registerAsync();
    }

    async function registerAsync(): Promise<void> {
        const toSave: {
            username: string;
            email: string;
            password: string;
            token: string | null;
        } = {
            username: username.trim(),
            email: email.trim(),
            password: password_1.trim(),
            token: data.token,
        };

        const response = await trySaveDataAsync(fetch, toSave, '/account/register', 'POST');
        errorList = response.messages;
        registered = response.success;
    }
</script>

<PageWrapper headerMenu={data.loggedIn ? Menu.headerLoggedIn : Menu.headerLoggedOut}
             footerMenu={data.loggedIn ? Menu.footerLoggedIn : Menu.footerLoggedOut}
             globals={data.globals}>
    <div class="register-content">
        {#if !registered}
            <form class="register-width-wrapper"
                  on:submit|preventDefault={tryRegisterAsync}>
                <HeadlinePage>Registrieren</HeadlinePage>
                <div class="register-message-wrapper">
                    <ErrorMessage message={loggedInMessage}/>
                    <ErrorMessage message={usernameMessage}/>
                    <ErrorMessage message={emailMessage}/>
                    <ErrorMessage message={passwordMessage}/>
                    <MessageWrapper messages={errorList}/>
                </div>
                <Input
                        id="register-username"
                        type="text"
                        labelText="Name:"
                        bind:value={username}
                        ariaLabel="Gib den Nutzernamen ein"
                        on:input={() => {
						startTimer(timerUsernameRef, onUsernameChangedAsync, 200);
					}}
                />
                <Input
                        id="register-email"
                        type="email"
                        labelText="E-Mail:"
                        bind:value={email}
                        ariaLabel="Gib die E-Mail ein"
                        on:input={() => {
						startTimer(timerEmailRef, onEmailChangedAsync, 200);
					}}
                />
                <Input
                        id="register-password"
                        type="password"
                        labelText="Passwort:"
                        bind:value={password_1}
                        ariaLabel="Gib das Passwort ein"
                        on:input={startPasswordTimer}
                />
                <Input
                        id="register-password-repeat"
                        type="password"
                        labelText="Passwort wiederholen:"
                        bind:value={password_2}
                        ariaLabel="Wiederhole das Passwort"
                        on:input={startPasswordTimer}
                />
                <Button
                        classes="register-submit-button"
                        type={'submit'}
                        ariaLabel="Klicke zum Registrieren"
                >
                    Registrieren
                </Button>
                <PasswordHints/>
            </form>
        {:else}
            <div class="register-width-wrapper">
                <HeadlinePage>Registriert</HeadlinePage>
                <TextLine classes="register-registered-text-line"
                          --text-align="center">
                    Deine Registrierung war erfolgreich.
                </TextLine>
                <Paragraph --text-align="center">
                    Du bekommst jetzt eine Mail. Bestätige deine Mailadresse, um dich anmelden zu können.
                    Weitere Infos findest du nach dem Anmelden.
                </Paragraph>
                <div class="button-wrapper">
                    <a href="/">
                        <Button ariaLabel="Klicke, um zur aktuellen Hauptseite zu gelangen">Start</Button>
                    </a>
                    <a href="./login">
                        <Button ariaLabel="Klicke, um dich anzumelden">Anmelden</Button>
                    </a>
                </div>
            </div>
        {/if}
    </div>
</PageWrapper>

<style>
    .register-content {
        display: flex;
        flex-direction: column;
        margin: 0 var(--2x-margin);
    }

    a {
        align-self: center;
    }

    .register-width-wrapper {
        width: 100%;
        max-width: 50rem;
        margin: 0 auto var(--4x-margin);
        display: flex;
        flex-direction: column;
    }

    .register-message-wrapper {
        display: flex;
        flex-direction: column;
        margin: var(--2x-margin) auto;
    }

    :global(.register-submit-button) {
        margin: var(--2x-margin) auto 0;
    }


    .button-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin-top: var(--4x-margin);
    }

    @media (max-width: 1280px) {
        .register-width-wrapper {
            max-width: 50rem;
        }
    }

    :global(.register-registered-text-line) {
        margin: var(--4x-margin) 0 var(--2x-margin);
    }
</style>
