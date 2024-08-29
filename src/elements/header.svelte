<script>
	import LogoSmall from './logoSmall.svelte';

	let isOpen = false;

	function toggleMobileMenu() {
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
				<li><a href="#top">Start</a></li>
				<li><a href="#Speaker">Vortragende</a></li>
				<li><a href="#Sponsors">Sponsoren und Medienpartner</a></li>
				<li><a href="#Shedule">Ablaufplan</a></li>
				<li><a href="/login">Login</a></li>
			</ul>
		</nav>
	</div>

	<!-- Mobile -->
	<div class="mobile-wrapper">
		<div class="hamburger" on:click={toggleMobileMenu}>
			<div></div>
			<div></div>
			<div></div>
		</div>

		<nav class="mobile-menu menu-{isOpen ? 'show' : 'close'}">
			<a href="#top">Start</a>
			<a href="#Speaker">Vortragende</a>
			<a href="#Sponsors">Sponsoren und Medienpartner</a>
			<a href="#Shedule">Ablaufplan</a>
			<a href="/login">Login</a>
		</nav>
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
		}
	}
</style>
