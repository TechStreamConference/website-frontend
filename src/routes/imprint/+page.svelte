<script lang="ts">
	import type { LoadImprint } from 'types/loadTypes';
	export let data: LoadImprint; // data from database;
	import * as Menu from 'menu/imprint';

	import Header from 'elements/navigation/header.svelte';
	import HeadlinePage from 'elements/text/headlinePage.svelte';
	import Footer from 'elements/navigation/footer.svelte';

	import SubHeadline from 'elements/text/subHeadline.svelte';
	import TextLine from 'elements/text/textLine.svelte';
	import Paragraph from 'elements/text/paragraph.svelte';
	import Link from 'elements/text/link.svelte';
</script>

<Header menu={data.loggedIn ? Menu.headerIn : Menu.headerOut} />

<div class="page page-imprint">
	<div class="content-wrapper">
		<HeadlinePage classes="headline">Impressum</HeadlinePage>

		<TextLine>Michael Gerhold</TextLine>
		<TextLine>c/o LEADERLY UG (haftungsbeschränkt)</TextLine>
		<TextLine>Carl-Zeiss-Str. 4</TextLine>
		<TextLine classes="one-line-margin">14727 Premnitz OT Mögelin</TextLine>
		<TextLine>
			E-Mail:
			<Link
				classes="inline"
				href="mailto:info@test-conf.de"
				newTab={true}
				title="Klicke, um uns eine Mail zu schreiben">info@test-conf.de</Link
			>
		</TextLine>

		<SubHeadline classes="subheadline"
			>Hinweis gemäß Online-Streitbeilegungs-Verordnung</SubHeadline
		>

		<Paragraph
			>Nach geltendem Recht sind wir verpflichtet, Verbraucher auf die Existenz der Europäischen
			Online-Streitbeilegungs-Plattform hinzuweisen, die für die Beilegung von Streitigkeiten
			genutzt werden kann, ohne dass ein Gericht eingeschaltet werden muss. Für die Einrichtung der
			Plattform ist die Europäische Kommission zuständig. Die Europäische
			Online-Streitbeilegungs-Plattform ist hier zu finden:
			<Link
				classes="inline"
				href="http://ec.europa.eu/odr"
				newTab={true}
				title="Klicke, um dich über die Europäische Online-Streitbeilegungs-Plattform zu informieren"
			>
				http://ec.europa.eu/odr
			</Link>
			. Unsere E-Mail lautet:
			<Link
				classes="inline one-line-margin"
				href="mailto:info@test-conf.de"
				newTab={true}
				title="Klicke, um uns eine Mail zu schreiben"
			>
				info@test-conf.de
			</Link>
		</Paragraph>
		<Paragraph>
			Wir weisen aber darauf hin, dass wir nicht bereit sind, uns am Streitbeilegungsverfahren im
			Rahmen der Europäischen Online-Streitbeilegungs-Plattform zu beteiligen. Nutzen Sie zur
			Kontaktaufnahme bitte unsere obige E-Mail und Telefonnummer.
		</Paragraph>

		<SubHeadline classes="subheadline">Disclaimer – rechtliche Hinweise</SubHeadline>

		<TextLine>§ 1 Warnhinweis zu Inhalten:</TextLine>
		<Paragraph classes="one-line-margin">
			Die kostenlosen und frei zugänglichen Inhalte dieser Webseite
			wurden mit größtmöglicher Sorgfalt erstellt. Der Anbieter dieser Webseite übernimmt jedoch
			keine Gewähr für die Richtigkeit und Aktualität der bereitgestellten kostenlosen und frei
			zugänglichen journalistischen Ratgeber und Nachrichten. Namentlich gekennzeichnete Beiträge
			geben die Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters wieder.
			Allein durch den Aufruf der kostenlosen und frei zugänglichen Inhalte kommt keinerlei
			Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande, insoweit fehlt es am
			Rechtsbindungswillen des Anbieters.
		</Paragraph>

		<TextLine>§ 2 Externe Links:</TextLine>
		<Paragraph classes="one-line-margin">
			Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links").
			Diese Websites unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der
			erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige
			Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich. Der Anbieter
			hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der
			verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass sich der Anbieter die
			hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine ständige Kontrolle der
			externen Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar.
			Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links unverzüglich gelöscht.
		</Paragraph>

		<TextLine>§ 3 Urheber- und Leistungsschutzrechte:</TextLine>
		<Paragraph classes="one-line-margin">
			Die auf dieser Website veröffentlichten Inhalte
			unterliegen dem deutschen Urheber- und Leistungsschutzrecht. Jede vom deutschen Urheber- und
			Leistungsschutzrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen
			Zustimmung des Anbieters oder jeweiligen Rechteinhabers. Dies gilt insbesondere für
			Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von
			Inhalten in Datenbanken oder anderen elektronischen Medien und Systemen. Inhalte und Rechte
			Dritter sind dabei als solche gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe
			einzelner Inhalte oder kompletter Seiten ist nicht gestattet und strafbar. Lediglich die
			Herstellung von Kopien und Downloads für den persönlichen, privaten und nicht kommerziellen
			Gebrauch ist erlaubt.
		</Paragraph>
		<TextLine classes="one-line-margin">
			Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis zulässig.
		</TextLine>

		<TextLine>§ 4 Besondere Nutzungsbedingungen:</TextLine>
		<Paragraph classes="last-paragraph">
			Soweit besondere Bedingungen für einzelne Nutzungen dieser
			Website von den vorgenannten Paragraphen abweichen, wird an entsprechender Stelle ausdrücklich
			darauf hingewiesen. In diesem Falle gelten im jeweiligen Einzelfall die besonderen
			Nutzungsbedingungen. Quelle:
			<Link
				classes="inline"
				href="https://www.juraforum.de/"
				newTab={true}
				title="Klicke hier, um zur Quelle dieses Online-Impressums zu gelangen"
			>
				Hier ansehen >>
			</Link>
		</Paragraph>
	</div>

	<Footer menu={data.loggedIn ? Menu.footerIn : Menu.footerOut} currentYear={data.currentYear} />
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content-wrapper {
		flex-grow: 1;
		padding: 0 3rem;
		max-width: 100rem;
		margin: 0 auto;
	}

	.page-imprint :global(.headline) {
		margin-bottom: 5rem;
	}

	.page-imprint :global(.one-line-margin) {
		margin-bottom: 1rem;
	}

	.page-imprint :global(.subheadline) {
		margin-top: 5rem;
		margin-bottom: 2rem;
	}

	.page-imprint :global(.last-paragraph) {
		margin-bottom: 7rem;
	}

	@media (max-width: 1280px) {
		.content-wrapper {
			padding: 0 2rem;
		}
	}

	@media (max-width: 600px) {
		.content-wrapper {
			padding: 0 1.5rem;
		}
	}
</style>
