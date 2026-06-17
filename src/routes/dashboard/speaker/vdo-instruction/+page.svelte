<script lang="ts">
    import * as Menu from "menu/dashboard";
    import * as MenuItem from "menu/dashboardItems";
    import Tabs from "elements/navigation/tabs.svelte";
    import Explanation from "elements/text/explanation.svelte";
    import SectionDashboard from "elements/section/sectionDashboard.svelte";
    import Headline from "elements/text/headline.svelte";
    import SubHeadline from "elements/text/subHeadline.svelte";
    import Image from "elements/image/image.svelte";
    import Paragraph from "elements/text/paragraph.svelte";
    import List from "elements/list/list.svelte";
    import ListElement from "elements/list/listElement.svelte";
</script>

<Tabs classes="subpage-navigation-tabs subpage-navigation-tabs-wide-tabs-override"
      position="center"
      entries={Menu.speaker}
      entryName={MenuItem.speakerVdoInstruction.name}/>

<SectionDashboard classes="standard-dashboard-section">
    <Explanation>
        Hier siehst du die Anleitung zum Einwählen während der Konferenz.<br/>
        Diese Anleitung gilt sowohl für Vorträge als auch vor Talkrunden.<br/>
        Sollten Fragen offen sein kontaktiert und bitte im Discord.<br/>
        Entweder per PN oder im internen Bereich.
    </Explanation>

    <Headline classes="headline-border headline-border">Speaker Anleitung</Headline>
    <SubHeadline classes="headline-border headline-border">Links Location:</SubHeadline>
    <Paragraph>Die Links werden automatisch angezeigt, sobald du eine Mail zu diesem Thema bekommen hast. Du findest sie
        dann im gesamten Speaker Tab über dem Untermenü.
    </Paragraph>
    <Paragraph>
        <b>HINWEIS:</b> Wir haben die Links extra hinter einem Button versteckt. Diese Links enthalten
        Passwörter. Bitte vorsichtig damit umgehen. Falls etwas leaked, bitte bescheid sagen. Wir
        müssen dann für alle neue Links generieren.
    </Paragraph>
    <Paragraph>
        Hinter den Button befinden sich 2 Links.
    </Paragraph>
    <Image src="/vdo-instruction-1.png" alt="VDO-Anleitung"/>
    <Image src="/vdo-instruction-2.png" alt="VDO-Anleitung"/>
    <SubHeadline classes="headline-border headline-border">Grundlegendes:</SubHeadline>
    <Paragraph>Grundsätzlich gibt es 2 Links für dich. Je einen für die Cam und einen für den Screen.
        Es ist wichtig, dass die Links für ihre gedachten Zweck verwendet werden, da diese bei uns als
        Einzelquellen im OBS ankommen.
    </Paragraph>
    <Paragraph>
        Grundsätzlich werden immer diese beiden Links für das gesamte Event hinweg verwendet. Auch
        wenn ihr mehrfach dabei seid.
    </Paragraph>
    <Paragraph>
        Wir bitten euch den Aufenthalt im VDO nicht maximal zu verlängern. Gerne etwas früher da sein,
        damit wir die Verbindung schon checken können. Aber da es sich um P2P-Verbindungen
        handelt, könnt ihr damit die Internetverbindung von anderen lahmlegen.
    </Paragraph>
    <Paragraph>
        Wenn ihr euch bei VDO einloggt, seid ihr sowohl stumm als auch taub. Ihr könnt dort keine LiveShow kaputt
        machen. Auch wenn ihr dort andere, aktuell Vortragende mit im Raum habt. Im
        Umkehrschluss heißt das auch. Nicht wundern, wenn da schon andere im Raum sind bzw. Leute
        dazu kommen, wenn ihr gerade vortragt. Das ist so gewollt.
    </Paragraph>
    <SubHeadline classes="headline-border headline-border">Discord:</SubHeadline>
    <Paragraph>Für die Kommunikation rund um euren Vortrag steht euch der Discord zur Verfügung. Dort gibt es
        unter dem aktuellen Jahr immer einen Backstage Voice Channel. Dieser wird in keiner Form
        übertragen. Auch dieser wird von uns verwaltet, sodass ihr dort bei eurem Vortrag bleiben könnt,
        ohne gestört zu werden. Wir empfehlen euch hier einfach vor eurem VDO einwählen zu joinen.
        Dort könnt ihr nochmal Fragen stellen etc.<br/>
        Hier seid ihr grundsätzlich das ganze Event über willkommen.
    </Paragraph>
    <SubHeadline classes="headline-border headline-border">Optimaler Ablauf:</SubHeadline>
    <List>
        <ListElement classes="list-element-dot">Discord joinen, ca 15-30 Minuten vorher (initial freigeschaltet)
        </ListElement>
        <ListElement classes="list-element-dot">Auf unser okay für VDO warten</ListElement>
        <ListElement classes="list-element-dot">Cam VDO joinen (initial stumm und taub)</ListElement>
        <ListElement classes="list-element-dot">Screen VDO joinen (stumm und taub)</ListElement>
        <ListElement classes="list-element-dot">(Vorheriger Vortrag geht zu Ende)</ListElement>
        <ListElement classes="list-element-dot">Discord wird (von uns) stumm und taub geschaltet</ListElement>
        <ListElement classes="list-element-dot">VDO wird (von uns) freigeschaltet</ListElement>
        <ListElement classes="list-element-dot">Wir checken die Signale mit dir</ListElement>
        <ListElement classes="list-element-dot">(Dein Vortrag beginnt)</ListElement>
        <ListElement classes="list-element-dot">Vorheriger Speaker wird (irgendwann) aus dem VDO verschwinden.
        </ListElement>
        <ListElement classes="list-element-dot">Nächster Speaker wird (irgendwann) im VDO auftauchen.</ListElement>
        <ListElement classes="list-element-dot">(Dein Vortrag endet)</ListElement>
        <ListElement classes="list-element-dot">VDO wird (von uns) stumm und taub geschaltet</ListElement>
        <ListElement classes="list-element-dot">Discord wird (von uns) freigeschaltet</ListElement>
        <ListElement classes="list-element-dot">Auf unser okay für VDO warten</ListElement>
        <ListElement classes="list-element-dot">Aus VDO abmelden</ListElement>
    </List>
    <SubHeadline classes="headline-border headline-border">Cam:</SubHeadline>
    <Paragraph>Die Cam ist deine Hauptquelle. Hier wird deine Stimme und deine Kamera übertragen. Wenn du
        auf unserer Internetseite auf den Link klickst, öffnet sich folgendes:
    </Paragraph>
    <Image src="/vdo-instruction-3.png" alt="VDO-Anleitung"/>
    <Paragraph>Hier bitte „Join Room with Camera“ auswählen. Es kann sein, dass ihr nun Berechtigungen
        akzeptieren müsst, damit VDO sowohl auf Kamera als auch auf Mikrofon zugreifen kann.
    </Paragraph>
    <Image src="/vdo-instruction-4.png" alt="VDO-Anleitung"/>
    <Paragraph>Hier die Entsprechenden Quellen auswählen.</Paragraph>
    <List>
        <ListElement classes="list-element-dot">Deine Kamera</ListElement>
        <ListElement classes="list-element-dot">Dein Mikrophon</ListElement>
        <ListElement classes="list-element-dot">Deine Lautsprecher, um die anderen zu hören</ListElement>
    </List>
    <Paragraph>An dieser Stelle vor dem joinen bitte checken, ob ein Mikrophon-Pegel vorhanden ist. Du wirst
        ihn in der Lobby nicht mehr sehen können, bis wir dich freischalten.
    </Paragraph>
    <Paragraph>Nach dem joinen seid ihr sowohl stumm als auch taub und müsst erst vom director
        freigeschaltet werden.
    </Paragraph>
    <SubHeadline classes="headline-border headline-border">Screen:</SubHeadline>
    <Paragraph>Wenn du keinen Screen übertragen musst / willst, kannst du diesen Abschnitt ignorieren.</Paragraph>
    <Paragraph>Der Screen ist die Quelle, um eure Präsentation, euren Desktop zu übertragen. Grundsätzlich
        können wir hier auch Systemaudio übertragen. Dies bitte vorher bei uns angeben, damit wir das
        Audio auch ausgeben. Diese Quelle wird zu keinem Zeitpunkt Ton abgeben, damit du dich nicht
        doppelt hörst.
    </Paragraph>
    <Paragraph>Wenn du auf unserer Internetseite auf den Links klickst, öffnet sich folgendes:</Paragraph>
    <Image src="/vdo-instruction-5.png" alt="VDO-Anleitung"/>
    <Paragraph>Hier bitte „Screenshare with Room“ auswählen. Auch hier können wir Berechtigungen nötig
        sein.
    </Paragraph>
    <Image src="/vdo-instruction-6.png" alt="VDO-Anleitung"/>
    <Paragraph>Hier mit dem grünen Button eine Quelle für den Screenshare auswählen.
        Die Audioeinstellungen kannst du hier ignorieren. Das wird durch die Cam-Quelle bereits
        abgedeckt. Außer du möchtest uns in irgendeiner Form (nicht einfach Desktopsound, das
        kommt noch) Audio schicken, was nicht deine Stimme ist. Dann bitte hier als Mikrophon
        auswählen.
    </Paragraph>
    <Image src="/vdo-instruction-7.png" alt="VDO-Anleitung"/>
    <Paragraph>Hier kannst du dich zwischen 3 verschiedenen Arten der Bildschirmübertragung entscheiden.
        Falls du auch Sound übertragen möchtest, ist es nun wichtig unten den Haken zu setzen. (und
        uns Bescheid sagen, damit wir das Audio auch weitergeben)
    </Paragraph>
    <Paragraph>Wir hoffen es ist so weit jetzt alles klar.
        Sonst gerne ansprechen.
        Wir helfe gerne.
        Während der Konferenz werden wir (Michael und ich) im backstage Kanal im Discord sein. Dort
        kannst du immer vorbei gucken und Fragen stellen.
    </Paragraph>
</SectionDashboard>

<style>

</style>
