<script lang="ts">
	import type { MenuItem } from 'types/provideTypes';
	import LogoSmall from 'elements/image/logoSmall.svelte';
	import { fade } from 'svelte/transition';
	import Link from 'elements/text/link.svelte';

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
	<div class="desktop-wrapper">
		<a
			href="/"
			class="logo-wrapper"
			title="Tech Stream Conference Seite des aktuellen Jahres anschauen"
		>
			<LogoSmall classes={'logo'} />
		</a>
		<nav>
			<ul>
				{#each menu as entry}
					<li>
						<Link classes="standard link" href={entry.url} title={entry.description}>{entry.name}</Link>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<!-- Mobile -->
	<div class="mobile-wrapper">
		<div class="hamburger-wrapper {isOpen ? 'open' : 'close'}">
			<a
				href="/"
				class="logo-wrapper"
				title="Tech Stream Conference Seite des aktuellen Jahres anschauen"
			>
				<LogoSmall classes={'logo'} />
			</a>

			<button class="hamburger" aria-label="Menü aufklappen" on:click={toggleOpen}>
				<div class={isOpen ? 'rotated' : 'normal'}></div>
				<div class={isOpen ? 'rotated' : 'normal'}></div>
				<div class={isOpen ? 'rotated' : 'normal'}></div>
			</button>
		</div>
		{#if isOpen}
			<div class="mobile-menu" transition:fade={{ duration: 300 }}>
				{#each menu as entry}
					<Link classes="standard link" href={entry.url} title={entry.description}
								on:click={collapse}>{entry.name}</Link>
				{/each}
			</div>
		{/if}
	</div>
</header>

<style>
    /* Desktop */
    .mobile-wrapper {
        display: none;
    }

    header {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 10;
    }

    .desktop-wrapper {
        background-color: var(--primary-color-light);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: var(--half-padding);
        padding-bottom: var(--half-padding);
        border-bottom: solid 1px black;
    }

    .navigation-header :global(.logo) {
        height: 5rem;
        margin-left: var(--full-margin);
    }

    ul {
        display: flex;
        margin: var(--full-margin);
        gap: var(--full-gap);
    }

    li {
        list-style-type: none;
        color: var(--text-color);
        transition: color var(--transition-duration);
    }

    .navigation-header :global(.link) {
        padding: var(--full-padding);
        color: var(--white-color);
        text-transform: uppercase;
    }

    /* Mobile */
    @media (max-width: 1280px) {
        .desktop-wrapper {
            display: none;
        }

        .mobile-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .navigation-header :global(.logo) {
            height: 3rem;
            margin-left: var(--full-margin);
        }

        .hamburger-wrapper {
            background-color: var(--primary-color-light);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-bottom: solid 1px black;
            transition: border var(--transition-duration);
            align-items: center;
        }

        .hamburger-wrapper.open {
            border-bottom: none;
            transition: border var(--transition-duration);
        }

        .logo-wrapper {
            display: inline-block;
            vertical-align: middle;
        }

        .hamburger {
            display: block;
            cursor: pointer;
            margin: var(--full-margin);
            background: transparent;
            border: none;
        }

        .hamburger div {
            width: 25px;
            height: 3px;
            background-color: white;
            margin: 5px 0;
            transition: var(--transition-duration);
        }

        .hamburger div:nth-child(1).normal {
            transform: translateX(0) rotate(0) translateY(0);
        }

        .hamburger div:nth-child(1).rotated {
            transform: translateX(7px) rotate(45deg) translateY(0.72rem);
        }

        .hamburger div:nth-child(2).normal {
            opacity: 1;
        }

        .hamburger div:nth-child(2).rotated {
            opacity: 0;
        }

        .hamburger div:nth-child(3).normal {
            transform: translateX(0) rotate(0) translateY(0);
        }

        .hamburger div:nth-child(3).rotated {
            transform: translateX(7px) rotate(-45deg) translateY(-0.72rem);
        }

        .mobile-menu {
            background-color: var(--primary-color-light);
            flex-direction: column;
            display: flex;
            border-bottom: solid 1px black;
        }

        .mobile-menu :global(.link) {
            text-transform: uppercase;
            color: var(--white-color);
						align-self: end;
        }
    }
</style>
