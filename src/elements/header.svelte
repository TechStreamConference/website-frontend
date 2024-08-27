<script>
	import LogoSmall from './logoSmall.svelte';
</script>

<header>
	<div class="nav-wrapper">
		<a href="/">
			<LogoSmall classList={'header'} />
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
</header>

<style>
	header {
		background-color: var(--primary-color);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	.nav-wrapper {
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
</style>
