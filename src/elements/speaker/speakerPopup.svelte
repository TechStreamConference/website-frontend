<script lang="ts">
	import VerticalLine from 'elements/line/verticalLine.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';
	import SpacerOneLine from 'elements/spacer/spacerOneLine.svelte';
	import Spacer from 'elements/spacer/spacer.svelte';
	import SubHeadline from 'elements/text/subHeadline.svelte';
	import SpeakerLinkGrid from './speakerLinkGrid.svelte';
</script>

<div class="page-wrapper">
	<div class="popup-wrapper">
		<div class="content-wrapper">
			<div class="column-wrapper">
				<img class="picture" src="/dummy_1_1.png" alt="" />
				<SpacerOneLine />
				<SubHeadline>OwlOrientedProgramming</SubHeadline>
				<Paragraph>
					Ich mache das Beste, das wir je begenet ist. Ich bin doch länger. Viel zu lang um genau zu
					sein. LUL
				</Paragraph>
				<Spacer --height="3rem" />
				<SpeakerLinkGrid />
			</div>
			<VerticalLine />
			<div class="column-wrapper">
				<SpacerOneLine />
				<Paragraph>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
					invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
					accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
					sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
					elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
					diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
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
		</div>
	</div>
</div>

<style>
	.page-wrapper {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		justify-content: center;
		align-items: center;
		background-color: var(--background-light-color);
		width: 100%;
		height: 100%;
		z-index: 1000;
	}

	.popup-wrapper {
		background-color: var(--background-color);
		border: 1px solid var(--primary-color);
		width: 50rem;
		height: 40rem;
	}

	.content-wrapper {
		margin: 1rem;
		display: flex;
		height: 38rem;
		justify-content: space-between;
	}

    .column-wrapper {
		width: 47%;
        height: 100%;
		display: flex;
		flex-direction: column;
	}

	.picture {
		width: auto;
		height: auto;
        border: 1px solid var(--primary-color);
	}
</style>
