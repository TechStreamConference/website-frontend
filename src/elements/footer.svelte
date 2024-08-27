<script>
	import LogoBig from './logoBig.svelte';
	export let currentYear;
	const startYear = 2024;

	const numbers = Array.from({ length: currentYear + 1 - startYear }, (_, i) => startYear + i);
</script>

<footer>
	<div class="nav-wrapper">
		<nav class="nav-element">
			<p class="Headline">Menu:</p>
			<ul>
				<li><a href="/login">Login</a></li>
				<li><a href="/login">Register</a></li>
				<li><a href="/impressum">Impressum</a></li>
			</ul>
		</nav>

		<nav class="nav-element">
			<p class="Headline">Alle Events:</p>
			<ul>
				{#each numbers as number}
					<li><a href="/year/{number}">{number}</a></li>
				{/each}
			</ul>
		</nav>

		<p class="discription nav-element">
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
			invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
			ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
			eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
			et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
			sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
			elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
			diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
			gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure
			dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat
			nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
			zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, -- ich
			habe 200 Wörter.
		</p>

		<LogoBig classList={'footer-img footer-nav-element'} />
	</div>

	<p class="copyright">&copy; Tech Stream Conference {currentYear}</p>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		background-color: var(--primary-color);
		padding: 2rem 0;
		color: var(--white-color);
		font-family: 'Gnuolane Extra Light', sans-serif;
		font-weight: 500;
		font-style: normal;
		letter-spacing: 2px;
		font-size: 1rem;
	}

	.nav-wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		gap: 10rem;
		padding: 0 10rem;
	}

	.nav-element {
		flex: 1;
		min-width: 10rem;
		text-align: center;
	}

	ul {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
	}

	li {
		list-style: none;
		padding: 0.2rem 0;
	}

	.Headline {
		padding-left: 0.2rem;
		padding-bottom: 1rem;
	}

	a {
		text-decoration: none;
		color: var(--white-color);
		padding: 0.3rem;
		border-radius: 0.6rem;
	}

	a:hover {
		background-color: var(--third-color);
		transition: background-color var(--transition-duration);
	}

	p {
		margin: 0;
		padding: 0;
	}

	.discription {
		overflow-wrap: normal;
	}

	.copyright {
		padding-top: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		font-size: 0.8rem;
	}
</style>
