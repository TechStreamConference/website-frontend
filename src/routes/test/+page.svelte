<script lang="ts">
	import Header from 'elements/header.svelte';
	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import Footer from 'elements/footer.svelte';

	import Spacer from 'elements/spacer/spacer.svelte';
	import SpacerOneLine from 'elements/spacer/spacerOneLine.svelte';

	import Paragraph from 'elements/text/paragraph.svelte';
	import TextLine from 'elements/text/textLine.svelte';

	const letterSpacing: string[] = ['1px', '2px'];
	const lineHeight: string[] = ['1.25rem','1.5rem'];

	const dummyMenu: [string, string][] = [['Start', '/']];
</script>

<Header menu={dummyMenu} />

<div class="content-wrapper">
	<HeadlinePage>Test</HeadlinePage>
	<Spacer --height="5rem" />
	<div class="content">
		{#each letterSpacing as spacing}
			{#each lineHeight as height}
				<TextLine>Spacing: {spacing} | Height: {height}</TextLine>
				<SpacerOneLine />
				<Paragraph --letter-spacing={spacing} --line-height={height}>
					§ 1 Warnhinweis zu Inhalten Die kostenlosen und frei zugänglichen Inhalte dieser Webseite
					wurden mit größtmöglicher Sorgfalt erstellt. Der Anbieter dieser Webseite übernimmt jedoch
					keine Gewähr für die Richtigkeit und Aktualität der bereitgestellten kostenlosen und frei
					zugänglichen journalistischen Ratgeber und Nachrichten. Namentlich gekennzeichnete
					Beiträge geben die Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters
					wieder. Allein durch den Aufruf der kostenlosen und frei zugänglichen Inhalte kommt
					keinerlei Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande, insoweit fehlt
					es am Rechtsbindungswillen des Anbieters.
				</Paragraph>

				<Spacer --height="5rem" />
			{/each}
		{/each}
		<Spacer --height="2rem" />
	</div>

	<Footer menu={dummyMenu} currentYear={2025} />
</div>

<style>
	.content-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		max-width: 50rem;
		margin: 0 auto;
	}
</style>
