<script lang="ts">
    import * as Menu from 'menu/verify';
    import * as MenuItem from 'menu/menuItems';

    import StyledLink from 'elements/input/styledLink.svelte';
    import HeadlinePage from 'elements/text/headlinePage.svelte';
    import TextLine from 'elements/text/textLine.svelte';
    import PageWrapper from 'elements/section/pageWrapper.svelte';


    export let data;
</script>

<PageWrapper headerMenu={Menu.header}
             footerMenu={Menu.footer}
             globals={data.globals}>
    <div class="verify-email-content-wrapper">
        <HeadlinePage>E-Mail Verifizierung</HeadlinePage>
        {#if data.success === undefined}
            <div class="verify-email-text-wrapper">
                <TextLine>👻 Wir versuchen gerade, deine E-Mail zu verifizieren... 👻</TextLine>
                <TextLine>Offenbar dauert das alles ein bisschen länger, als wir erwartet haben.</TextLine>
                <TextLine>Bitte hab etwas Geduld</TextLine>
            </div>
            <TextLine>Falls sich hier länger nix tun sollte, melde dich gerne bei uns.</TextLine>
            <StyledLink
                  text={MenuItem.imprint.name}
                  href={MenuItem.imprint.url}
                  title={MenuItem.imprint.description}
                  newTab={false}
            />
        {:else if data.success}
            <div class="verify-email-text-wrapper">
                <TextLine>Deine E-Mail wurde erfolgreich verifiziert.</TextLine>
                <TextLine>Du kannst dich jetzt anmelden.</TextLine>
            </div>
            <StyledLink
                  text={MenuItem.login.name}
                  href={MenuItem.login.url}
                  title={MenuItem.login.description}
                  newTab={false}
            ></StyledLink>
        {:else}
            <div class="verify-email-text-wrapper">
                <TextLine>🫨 Verifizierung leider nicht erfolgreich. 🫨</TextLine>
                <TextLine>Registriere dich bitte erneut, um eine neue Mail zu erhalten.</TextLine>
            </div>
            <StyledLink
                  text={MenuItem.register.name}
                  href={MenuItem.register.url}
                  title={MenuItem.register.description}
                  newTab={false}
            />
        {/if}
    </div>
</PageWrapper>

<style>
    .verify-email-content-wrapper {
        max-width:      150rem;
        align-self:     center;
        display:        flex;
        flex-direction: column;
        align-items:    center;
        gap:            var(--8x-gap);
    }

    .verify-email-text-wrapper {
        display:        flex;
        flex-direction: column;
        align-items:    center;
    }
</style>
