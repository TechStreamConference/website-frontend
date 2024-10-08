<script lang="ts">
	import type { MenuItem } from 'types/provideTypes';
	import LogoSmall from 'elements/image/logoSmall.svelte';
	import { fade } from 'svelte/transition';

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
					<li><a href={entry.url} title={entry.description}>{entry.name}</a></li>
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
					<a href={entry.url} title={entry.description} on:click={collapse}>{entry.name}</a>
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
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
	}

	.desktop-wrapper {
		background-color: var(--primary-color-light);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		border-bottom: solid 1px black;
	}

	.navigation-header :global(.logo) {
		height: 5rem;
		margin-left: 1rem;
	}

	ul {
		display: flex;
		margin: 1rem;
	}

	li {
		list-style-type: none;
		color: var(--text-color);
		transition: color var(--transition-duration);
	}

	li a {
		text-decoration: none;
		padding: 1rem 1.5rem;
		border-radius: 0.6rem;
		transition: background-color var(--transition-duration);
		color: var(--white-color);
		font-family: gnuolane, sans-serif;
		font-weight: 500;
		font-style: normal;
		font-size: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	li a:hover {
		background-color: var(--primary-color-dark);
		transition: background-color var(--transition-duration);
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
			margin-left: 1rem;
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
			margin: 1.5rem;
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

		.mobile-menu a {
			text-align: right;
			margin: 1.5rem;
			text-decoration: none;
			color: var(--white-color);
			font-family: gnuolane, sans-serif;
			font-weight: 500;
			font-style: normal;
			font-size: 1.5rem;
			text-transform: uppercase;
			letter-spacing: 2px;
		}
	}

	/* Mobile in Landscape */
	@media (max-height: 450px) {
		.mobile-menu a {
			font-size: 1rem;
			margin: 1rem;
		}
	}
</style>
