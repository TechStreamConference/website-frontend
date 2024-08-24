<script>
	import '../styles/Basic.css';
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
		font-size: 1.2rem;
		color: white;
		transition: 0.3s;
		border-radius: 0.6rem;
	}

	.nav-entry:hover {
		background-color: rgb(132, 65, 132);
		transition: 0.3s;
	}

	.logo_small {
		height: 5rem;
		margin-left: 1rem;
	}

	header {
		background-color: blueviolet;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
</style>
