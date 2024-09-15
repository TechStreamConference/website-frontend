<script lang="ts">
	import List from './list/list.svelte';
	import ListElement from './list/listElement.svelte';
	import Link from './text/link.svelte';
	import LogoBig from './logoBig.svelte';
	import Paragraph from './text/paragraph.svelte';
	import TextLine from './text/textLine.svelte';
	import SpacerOneLine from './spacer/spacerOneLine.svelte';

	export let currentYear: number;
	export let menu: [string, string][];

	const startYear: number = 2024;

	const numbers: number[] = Array.from(
		{ length: currentYear + 1 - startYear },
		(_, i) => startYear + i
	);
</script>

<footer>
	<div class="nav-wrapper">
		<nav class="nav-element">
			<TextLine>Menu:</TextLine>
			<SpacerOneLine />
			<List>
				{#each menu as entry}
					<ListElement>
						<Link href={entry[1]}>{entry[0]}</Link>
					</ListElement>
				{/each}
			</List>
		</nav>

		<nav class="nav-element">
			<TextLine>Alle Events:</TextLine>
			<SpacerOneLine />
			<List>
				{#each numbers as number}
					<ListElement>
						<Link href="/year/{number}">{number}</Link>
					</ListElement>
				{/each}
			</List>
		</nav>

		<div class="nav-element">
			<Paragraph>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
				et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
				Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
				diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
				gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
				amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
				dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
				et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
				amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
				consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
				odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
				nulla facilisi. Lorem ipsum dolor sit amet, -- ich habe 200 Wörter.
			</Paragraph>
		</div>

		<div class="nav-element">
			<LogoBig />
		</div>
	</div>
	<SpacerOneLine />
	<SpacerOneLine />
	<div class="copyright">
		<TextLine>&copy; Tech Stream Conference {currentYear}</TextLine>
	</div>
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
		gap: 5rem;
		padding: 0 5rem;
	}

	.nav-element {
		flex: 1;
		min-width: 14rem;
		text-align: center;
	}

	:global(.logo-big) {
		height: 10rem;
		object-fit: contain;
		max-height: 12rem;
	}

	.copyright {
		display: flex;
		justify-content: center;
	}
</style>
