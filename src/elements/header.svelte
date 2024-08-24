<script>
	import 'styles/Basic.css';

	const logoPath = '/logo_klein.png';
</script>

<header>
	<div class="nav-wrapper">
		<a href="#top">
			<img
				class="logo_small"
				src={logoPath}
				alt="The small Test-Conf logo. It shows the name on black clouds."
			/>
		</a>
		<nav>
			<li><a class="nav-entry" href="#top">Start</a></li>
			<li><a class="nav-entry" href="#Speaker">Vortragende</a></li>
			<li><a class="nav-entry" href="#Sponsors">Sponsoren und Medienpartner</a></li>
			<li><a class="nav-entry" href="#Shedule">Ablaufplan</a></li>
			<li><a class="nav-entry" href="/login">Login</a></li>
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

	nav {
		display: flex;
		margin: 1rem;
	}

	.nav-entry {
		padding-top: 1rem;
		padding-bottom: 1rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		border-radius: 0.6rem;
		transition: background-color var(--transition-duration);
		color: white;
	}

	.nav-entry:hover {
		background-color: var(--third-color);
		transition: background-color var(--transition-duration);
	}

	.logo_small {
		height: 5rem;
		margin-left: 1rem;
	}
</style>
