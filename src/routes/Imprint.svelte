<script lang="ts">
    import type {Globals} from "@/types/provideTypes";

    import Loading from "@/lib/async/Loading.svelte";
    import Page from "@/lib/default/Page.svelte";
    import TextLine from "@/lib/text/TextLine.svelte";
    import Link from "@/lib/text/Link.svelte";
    import Paragraph from "@/lib/text/Paragraph.svelte";
    import SubHeadline from "@/lib/text/SubHeadline.svelte";
    import HeadlinePage from "@/lib/text/HeadlinePage.svelte";

    import {get_globals} from "@/stores/globals";
    import {default_footer_menu_in, default_footer_menu_out, default_header_menu_in, default_header_menu_out} from "@/config/menu";
    import {has_roles} from "@/stores/roles";
    import {onMount} from "svelte";

    let loading_guard: Loading;
    let globals: Globals;

    onMount(async () => {
        globals = await get_globals();
        loading_guard.mark_loaded();
    })
</script>

<Loading bind:this={loading_guard}>
    <Page header_menu_logged_in={default_header_menu_in} header_menu_logged_out={default_header_menu_out}
          footer_menu_logged_in={default_footer_menu_in} footer_menu_logged_out={default_footer_menu_out}
          logged_in={has_roles()}
          {globals}>
        <div class="imprint-content-wrapper">
            <HeadlinePage classes="imprint-headline">Impressum</HeadlinePage>

            <TextLine>Michael Gerhold</TextLine>
            <TextLine>c/o LEADERLY UG (haftungsbeschränkt)</TextLine>
            <TextLine>Amtstraße 22</TextLine>
            <TextLine classes="imprint-one-line-margin">44575 Castrop-Rauxel</TextLine>
            <TextLine>
                E-Mail:
                <Link
                        classes="link-inline"
                        href="mailto:info@test-conf.de"
                        newTab={true}
                        title="Klicke, um uns eine Mail zu schreiben">info@test-conf.de
                </Link
                >
            </TextLine>

            <SubHeadline classes="imprint-sub-headline">Hinweis gemäß Online-Streitbeilegungs-Verordnung
            </SubHeadline
            >

            <Paragraph
            >Nach geltendem Recht sind wir verpflichtet, Verbraucher auf die Existenz der Europäischen
                Online-Streitbeilegungs-Plattform hinzuweisen, die für die Beilegung von Streitigkeiten
                genutzt werden kann, ohne dass ein Gericht eingeschaltet werden muss. Für die Einrichtung der
                Plattform ist die Europäische Kommission zuständig. Die Europäische
                Online-Streitbeilegungs-Plattform ist hier zu finden:
                <Link
                        classes="link-inline"
                        href="https://ec.europa.eu/odr"
                        newTab={true}
                        title="Klicke, um dich über die Europäische Online-Streitbeilegungs-Plattform zu informieren"
                >
                    https://ec.europa.eu/odr
                </Link>
                . Unsere E-Mail lautet:
                <Link
                        classes="link-inline imprint-one-line-margin"
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

            <SubHeadline classes="imprint-sub-headline">Disclaimer – rechtliche Hinweise</SubHeadline>

            <TextLine>§ 1 Warnhinweis zu Inhalten:</TextLine>
            <Paragraph classes="imprint-one-line-margin">
                Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden mit größtmöglicher
                Sorgfalt erstellt. Der Anbieter dieser Webseite übernimmt jedoch keine Gewähr für die
                Richtigkeit und Aktualität der bereitgestellten kostenlosen und frei zugänglichen
                journalistischen Ratgeber und Nachrichten. Namentlich gekennzeichnete Beiträge geben die
                Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters wieder. Allein durch
                den Aufruf der kostenlosen und frei zugänglichen Inhalte kommt keinerlei Vertragsverhältnis
                zwischen dem Nutzer und dem Anbieter zustande, insoweit fehlt es am Rechtsbindungswillen des
                Anbieters.
            </Paragraph>

            <TextLine>§ 2 Externe Links:</TextLine>
            <Paragraph classes="imprint-one-line-margin">
                Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links"). Diese Websites
                unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen
                Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige
                Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich. Der Anbieter
                hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der
                verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass sich der Anbieter die
                hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine ständige Kontrolle der
                externen Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar.
                Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links unverzüglich gelöscht.
            </Paragraph>

            <TextLine>§ 3 Urheber- und Leistungsschutzrechte:</TextLine>
            <Paragraph classes="imprint-one-line-margin">
                Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und
                Leistungsschutzrecht. Jede vom deutschen Urheber- und Leistungsschutzrecht nicht zugelassene
                Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen
                Rechteinhabers. Dies gilt insbesondere für Vervielfältigung, Bearbeitung, Übersetzung,
                Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen
                elektronischen Medien und Systemen. Inhalte und Rechte Dritter sind dabei als solche
                gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe einzelner Inhalte oder
                kompletter Seiten ist nicht gestattet und strafbar. Lediglich die Herstellung von Kopien und
                Downloads für den persönlichen, privaten und nicht kommerziellen Gebrauch ist erlaubt.
            </Paragraph>
            <TextLine classes="imprint-one-line-margin">
                Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis zulässig.
            </TextLine>

            <TextLine>§ 4 Besondere Nutzungsbedingungen:</TextLine>
            <Paragraph classes="imprint-last-paragraph">
                Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von den vorgenannten
                Paragraphen abweichen, wird an entsprechender Stelle ausdrücklich darauf hingewiesen. In
                diesem Falle gelten im jeweiligen Einzelfall die besonderen Nutzungsbedingungen. Quelle:
                <Link
                        classes="link-inline"
                        href="https://www.juraforum.de/"
                        newTab={true}
                        title="Klicke hier, um zur Quelle dieses Online-Impressums zu gelangen"
                >
                    Hier ansehen >>
                </Link>
            </Paragraph>
        </div>
    </Page>

</Loading>
<style>
    .imprint-content-wrapper {
        padding: 0 var(--2x-padding);
        max-width: 150rem;
        margin: 0 auto;
    }

    :global(.imprint-headline) {
        margin-bottom: var(--4x-margin);
    }

    :global(.imprint-one-line-margin) {
        margin-bottom: var(--2x-margin);
    }

    :global(.imprint-sub-headline) {
        margin-top: var(--4x-margin);
        margin-bottom: var(--2x-margin);
    }

    :global(.imprint-last-paragraph) {
        margin-bottom: var(--8x-margin);
    }

    @media (max-width: 1280px) {
        .imprint-content-wrapper {
            padding: 0 var(--2x-padding);
        }
    }

    @media (max-width: 600px) {
        .imprint-content-wrapper {
            padding: 0 var(--full-padding);
        }
    }
</style>
