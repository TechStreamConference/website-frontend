<script>
	import LogoSmall from './logoSmall.svelte';

	const menu = [
		['Start', '#top'],
		['Vortragende', '#Speaker'],
		['Sponsoren und Medienpartner', '#Sponsors'],
		['Ablaufplan', '#Shedule'],
		['Login', '/login']
	];

	let isOpen = false;

	function toggleOpen() {
		isOpen = !isOpen;
	}
</script>

<header>
	<!-- Desktop -->
	<div class="desktop-wrapper">
		<a href="/">
			<LogoSmall classList={'header-desktop-img'} />
		</a>
		<nav>
			<ul>
				{#each menu as entry}
					<li><a href={entry[1]}>{entry[0]}</a></li>
				{/each}
			</ul>
		</nav>
	</div>

	<!-- Mobile -->
	<div class="mobile-wrapper">
		<div class="hamburger-wrapper">
			<LogoSmall classList="header-mobile-img" />

			<button class="hamburger" on:click={toggleOpen}>
				<div></div>
				<div></div>
				<div></div>
			</button>
		</div>
		<div class="mobile-menu {isOpen ? 'show' : 'hide'}">
			{#each menu as entry}
				<a href={entry[1]}>{entry[0]}</a>
			{/each}
		</div>
	</div>
</header>

<style>
	/* Desktop */
	.mobile-wrapper {
		display: none;
	}

	header {
		background-color: var(--primary-color);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	.desktop-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		border-bottom: solid 3px black;
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
		background-color: var(--third-color);
		transition: background-color var(--transition-duration);
	}

	/* Mobile */
	@media (max-width: 1200px) {
		.desktop-wrapper {
			display: none;
		}

		.mobile-wrapper {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.hamburger-wrapper {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		.hamburger {
			display: block;
			cursor: pointer;
			margin: 1rem;
			background: transparent;
			border: none;
		}

		.hamburger div {
			width: 25px;
			height: 3px;
			background-color: white;
			margin: 5px 0;
			transition: 0.4s;
		}

		.mobile-menu {
			flex-direction: column;
			display: none;
		}

		.mobile-menu.show {
			display: flex;
		}

		.mobile-menu a {
			text-align: right;
			margin: 1rem;
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
</style>
