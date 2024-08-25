<footer>
	<div class="nav-wrapper">
		<nav>
			<ul>
				<li><a href="/login">Login</a></li>
				<li><a href="/login">Register</a></li>
				<li><a href="/impressum">Impressum</a></li>
			</ul>
		</nav>
		
		<nav>
			<p class="YearHeadline">Alle Test-Conf:</p>
			<ul>
				<li><a href="/year/2023">2023</a></li>
				<li><a href="/year/2024">2024</a></li>
			</ul>
		</nav>
		
		<p>
			Bester Beschreibungstext <br />
			aös,jkdhfga <br />
			sgasdg asdgasdgasd <br />
			gasdgökajsdhga <br />
			sdgaölkjskdhg
		</p>

		<img src={"/logo_big.png"} alt="The small Test-Conf logo. It shows the name on black clouds."/>
	</div>

	<p class="copyright">&copy; Tech Stream Conference 2024</p>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		background-color: var(--primary-color);
		padding: 3rem 0;
		color: var(--white-color);
		font-family: 'Gnuolane Extra Light', sans-serif;
		font-weight: 500;
		font-style: normal;
		letter-spacing: 2px;
		font-size: 1.5rem;
	}

	.nav-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	img {
		height: 10rem;
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

	.YearHeadline {
		padding-left: 0.2rem;
		padding-bottom: 1rem;
	}

	a:hover {
		background-color: var(--third-color);
		transition: background-color var(--transition-duration);
	}

	a {
		text-decoration: none;
		color: var(--white-color);
		padding: 0.3rem;
		border-radius: 0.6rem;
	}

	p {
		margin: 0;
		padding: 0;
	}

	.copyright {
		padding-top: 5rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
