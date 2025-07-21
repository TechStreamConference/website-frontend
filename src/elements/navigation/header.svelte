<script lang="ts">
    import type {MenuItem} from 'types/provideTypes';
    import LogoSmall from 'elements/image/logoSmall.svelte';
    import ThemeToggle from "elements/input/themeToggle.svelte";
    import Link from 'elements/text/link.svelte';
    import {fade} from 'svelte/transition';

    export let menu: MenuItem[];

    let isOpen: boolean = false;

    function toggleOpen(): void {
        isOpen = !isOpen;
    }

    function collapse(): void {
        isOpen = false;
    }
</script>

<header class="navigation-header">
    <!-- Desktop -->
    <div class="navigation-header-desktop-wrapper">
        <a
                href="/"
                class="navigation-header-logo-wrapper"
                title="Tech Stream Conference Seite des aktuellen Jahres anschauen"
        >
            <LogoSmall classes={'navigation-header-logo'}/>
        </a>
        <nav>
            <ul>
                {#each menu as entry}
                    <li>
                        <Link
                                font="sub-headline-font"
                                classes="link-standard navigation-header-link"
                                href={entry.url}
                                title={entry.description}>{entry.name}</Link
                        >
                    </li>
                {/each}
                <li>
                    <ThemeToggle/>
                </li>
            </ul>
        </nav>
    </div>

    <!-- Mobile -->
    <div class="navigation-header-mobile-wrapper">
        <div class="navigation-header-hamburger-wrapper {isOpen ? 'open' : 'close'}">
            <a
                    href="/"
                    class="navigation-header-logo-wrapper"
                    title="Tech Stream Conference Seite des aktuellen Jahres anschauen"
            >
                <LogoSmall classes={'navigation-header-logo'}/>
            </a>

            <button
                    class="navigation-header-hamburger"
                    aria-label="Menü aufklappen"
                    on:click={toggleOpen}
            >
                <span class={isOpen ? 'rotated' : 'normal'}></span>
                <span class={isOpen ? 'rotated' : 'normal'}></span>
                <span class={isOpen ? 'rotated' : 'normal'}></span>
            </button>
        </div>
        {#if isOpen}
            <div class="navigation-header-mobile-menu"
                 transition:fade={{ duration: 300 }}>
                {#each menu as entry}
                    <Link
                            font="sub-headline-font"
                            classes="link-standard navigation-header-link"
                            href={entry.url}
                            title={entry.description}
                            --text-align="center"
                            on:click={collapse}>{entry.name}</Link
                    >
                {/each}
                <ThemeToggle/>
            </div>
        {/if}
    </div>
</header>

<style>
    /* Desktop */
    header {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 10;
    }

    .navigation-header-mobile-wrapper {
        display: none;
    }

    .navigation-header-desktop-wrapper {
        background-color: var(--primary-color-light);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: var(--half-padding);
        padding-bottom: var(--half-padding);
        border-bottom: solid 1px black;
    }

    :global(.navigation-header-logo) {
        height: 8rem;
        margin-left: var(--full-margin);
    }

    ul {
        display: flex;
        margin: var(--full-margin);
        gap: var(--2x-gap);
    }

    li {
        list-style-type: none;
        color: var(--text-color);
        transition: color var(--transition-duration);
        align-self: center;
    }

    :global(.navigation-header-link) {
        color: var(--white-color);
        text-transform: uppercase;
        font-size: var(--1-5x-font-size) !important;
        padding: var(--full-padding) !important;
    }

    /* Mobile */
    @media (max-width: 1280px) {
        .navigation-header-desktop-wrapper {
            display: none;
        }

        .navigation-header-mobile-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        :global(.navigation-header-logo) {
            height: 6rem;
            margin-left: var(--full-margin);
        }

        .navigation-header-hamburger-wrapper {
            background-color: var(--primary-color-light);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-bottom: solid 1px black;
            transition: border var(--transition-duration);
            align-items: center;
        }

        .navigation-header-hamburger-wrapper.open {
            border-bottom: none;
            transition: border var(--transition-duration);
        }

        .navigation-header-logo-wrapper {
            display: inline-block;
            vertical-align: middle;
        }

        .navigation-header-hamburger {
            display: block;
            cursor: pointer;
            margin: var(--full-margin);
            background: transparent;
            border: none;
        }

        .navigation-header-hamburger span {
            width: 25px;
            height: 3px;
            background-color: white;
            margin: 5px 0;
            transition: var(--transition-duration);
            display: block;
        }

        .navigation-header-hamburger span:nth-child(1).normal {
            transform: translateX(0) rotate(0) translateY(0);
        }

        .navigation-header-hamburger span:nth-child(1).rotated {
            transform: translateX(7px) rotate(45deg) translateY(11px);
        }

        .navigation-header-hamburger span:nth-child(2).normal {
            opacity: 1;
        }

        .navigation-header-hamburger span:nth-child(2).rotated {
            opacity: 0;
        }

        .navigation-header-hamburger span:nth-child(3).normal {
            transform: translateX(0) rotate(0) translateY(0);
        }

        .navigation-header-hamburger span:nth-child(3).rotated {
            transform: translateX(7px) rotate(-45deg) translateY(-11px);
        }

        .navigation-header-mobile-menu {
            background-color: var(--primary-color-light);
            flex-direction: column;
            display: flex;
            border-bottom: solid 1px black;
            position: fixed;
            left: 0;
            right: 0;
            top: 6rem;
        }

        :global(.navigation-header-link) {
            text-transform: uppercase;
            color: var(--white-color);
            width: 100%;
        }
    }
</style>
