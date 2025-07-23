<script lang="ts">
    import type {LoadSpeakerTeamMemberEvent} from 'types/dashboardLoadTypes';
    import type {CropperProps} from "types/cropperTypes";

    import {setUnsavedChanges} from 'stores/saved';
    import {imageUrl} from 'helper/links';
    import {createEventDispatcher} from 'svelte';

    import BasePopup from 'elements/popups/basePopup.svelte'
    import Cropper from 'elements/image/cropper.svelte'
    import CroppedImage from 'elements/image/croppedImage.svelte';
    import Button from 'elements/input/button.svelte';
    import Image from 'elements/image/image.svelte';
    import Input2 from 'elements/input/input2.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import FormWrapper from 'elements/wrapper/formWrapper.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';

    export let data: LoadSpeakerTeamMemberEvent;
    // If the save button is not displayed, the form also gets removed. This means on:save will not be triggert is that case.
    export let displaySaveButton: boolean = true;
    const dispatch = createEventDispatcher();

    let imageInput: Input2;
    const DEFAULT_CROPPER_PROPS: CropperProps = {
        x: 0,
        y: 0,
        height: 350,
        width: 350,
    };
    export let cropperProps: CropperProps = DEFAULT_CROPPER_PROPS;
    let newImage: Blob | null = null;
    let popup: BasePopup;
    let cropper: Cropper;

    export function getNewImage(): Blob | null {
        return newImage;
    }

    export function getCropperProps(): CropperProps {
        return cropperProps;
    }

    $: if (data.event.photo) {
        resetImage();
    }

    function changeImage(event: Event): void {
        if (!event.target) {
            resetImage();
            return;
        }
        const input = event.target as HTMLInputElement;

        if (!input.files || !input.files[0]) {
            resetImage();
            return;
        }

        newImage = input.files[0];
        popup.show();
    }

    function resetImage(): void {
        newImage = null;
        cropperProps = DEFAULT_CROPPER_PROPS;
        if (imageInput) {
            imageInput.clear();
        }
    }
</script>


<BasePopup
        bind:this={popup}
>
    <Cropper
            bind:this={cropper}
            classes="dashboard-speaker-event-cropper"
            bind:cropperProps={cropperProps}
            file={newImage}
    ></Cropper>
</BasePopup>

<FormWrapper classes="dashboard-speaker-event-form form-border"
             submitCallback={() => { dispatch('save'); }}
             useForm={displaySaveButton}
>
    {#if newImage}
        <div class="dashboard-speaker-event-cropped-image-wrapper">
            <CroppedImage
                    ariaLabel="Dein neues Speaker-Bild für das Event {data.current.title}"
                    {cropperProps}
                    file={newImage}
                    classes="dashboard-speaker-events-image"
            />
            <Button
                    classes="dashboard-speaker-event-cropped-image-delete-button"
                    ariaLabel="Klicke hier, um das aktuelle Bild zu löschen"
                    buttonSize="small-button"
                    on:click={resetImage}
                    type="button">X
            </Button
            >
        </div>
    {:else if data.event.photo}
        <Image
                alt="Dein aktuelles Speaker-Bild für das Event {data.current.title}"
                src={imageUrl(data.event.photo)}
                classes="dashboard-speaker-events-image"
        />
    {/if}
    <div class="input-grid">
        <Input2
                bind:this={imageInput}
                id="dashboard-speaker-event-image-input"
                labelText="Profilbild:"
                ariaLabel="Lade hier dein Profilbild für das Event {data.current.title} hoch"
                type="file"
                fileAccept=".jpg, .jpeg, .png"
                on:input={(event) => {
				    setUnsavedChanges();
				    changeImage(event);
			    }}
        />
        <Paragraph classes="paragraph-gray">Lade hier dein Profilbild für deine Bewerbung hoch. Wenn deine
            Speaker-Bewerbung und später dein
            Vortrag angenommen werden, wird dieses Bild auf der Startseite angezeigt.
        </Paragraph>
        <div class="row-border"></div>
        <Input2
              id="dashboard-speaker-event-name-input"
              labelText="Name:"
              ariaLabel="Gib hier deinen Namen für das Event {data.current.title} ein"
              limit={50}
              bind:value={data.event.name}
              on:input={setUnsavedChanges}
        />
        <Paragraph classes="paragraph-gray">Unter diesem Namen tauchst du später auf der Hauptseite auf. Er muss nicht
            identisch zu dem Namen
            sein, mit dem du dich einloggst.
        </Paragraph>
        <div class="row-border"></div>
        <Input2
              id="dashboard-speaker-event-short-bio-input"
              labelText="Kurzbeschreibung:"
              ariaLabel="Gib hier deine Kurzbeschreibung in Stichworten für das Event {data.current
				.title} ein"
              limit={100}
              bind:value={data.event.short_bio}
              on:input={setUnsavedChanges}
        />
        <Paragraph classes="paragraph-gray">Deine Kurzbeschreibung sollte aus etwa drei bis fünf Stichpunkten bestehen,
            z. B. <i>„Unity Developer,
                Game Designer”</i> oder <i>„Embedded- und Lowlevel-Coding”</i>.
        </Paragraph>
        <div class="row-border"></div>
        <TextArea
                id="dashboard-speaker-event-bio-text-area"
                labelText="Beschreibung:"
                ariaLabel="Gib hier deine Beschreibung für das Event {data.current.title} ein"
                limit={1000}
                bind:value={data.event.bio}
                on:input={setUnsavedChanges}
        />
        <Paragraph classes="paragraph-gray">Beschreibe dich hier in einem kurzen Text von ca. 50 bis 80 Wörtern. Ein
            Beispieltext könnte lauten:
            <i>„GyrosGeier hat nicht nur einen witzigen Namen – nein – er kennt sich auch ziemlich gut im Bereich
                der Low-Level- bzw. Systemprogrammierung aus. Im vergangenen Jahr ist er nach Tokyo ausgewandert und
                arbeitet dort für eine Firma, die Mikrosatelliten ins Weltall schießt. In seinen Streams bastelt er
                an zahlreichen Projekten und vergisst niemals, den Yak-Stapel zu vergrößern.”</i>
        </Paragraph>
        {#if displaySaveButton}
            <div class="row-border"></div>
            <Button
                    type="submit"
                    ariaLabel="Klicke zum Speichern"
                    classes="button-text dashboard-speaker-event-submit-button">Speichern
            </Button>
        {/if}
    </div>
</FormWrapper>

<style>
    :global(.dashboard-speaker-event-cropper) {
        margin: var(--full-margin);
    }

    :global(.dashboard-speaker-event-form) {
        display: flex;
        flex-direction: column;
        gap: var(--full-gap);
    }

    .input-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--full-gap);


    }

    :global(.input-grid > .paragraph-gray) {
        align-self: center;
    }

    .row-border {
        border-top: 1px solid var(--background-color-light);
        grid-column: 1 / 3;
    }

    :global(.dashboard-speaker-events-image) {
        max-height: 30rem;
        max-width: 30rem;
        align-self: center;
        border: 1px solid var(--primary-color-dark);
        border-radius: var(--border-radius);
    }

    :global(.dashboard-speaker-event-submit-button) {
        margin: 0 auto;
        grid-column: 1 / 3;
    }

    .dashboard-speaker-event-cropped-image-wrapper {
        position: relative;
        width: fit-content;
        align-self: center;
    }

    :global(.dashboard-speaker-event-cropped-image-delete-button) {
        position: absolute;
        top: -5%;
        right: -7%;
        z-index: 1;
    }
</style>
