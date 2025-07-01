<script lang="ts">
    import type { LoadSpeakerTeamMemberEvent } from 'types/dashboardLoadTypes';
    import type Cropper from 'svelte-easy-crop';
    import type { NewImage } from 'pageHelper/speakerTeamMemberEvent';

    import { setUnsavedChanges } from 'stores/saved';
    import { imageUrl } from 'helper/links';
    import { onDestroy } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    import CroppedImage from 'elements/image/croppedImage.svelte';
    import Button from 'elements/input/button.svelte';
    import Image from 'elements/image/image.svelte';
    import Input from 'elements/input/input.svelte';
    import TextArea from 'elements/input/textArea.svelte';
    import MyCropper from 'elements/MyCropper/myCropper.svelte';
    import FormWrapper from 'elements/wrapper/formWrapper.svelte';
    import Paragraph from 'elements/text/paragraph.svelte';

    export let data: LoadSpeakerTeamMemberEvent;
    // If the save button is not displayed, the form also gets removed. This means on:save will not be triggert is that case.
    export let displaySaveButton: boolean = true;
    const dispatch                        = createEventDispatcher();

    let imageInput: Input;
    let imagePreviewURL: string | undefined = undefined;
    let showCropperPopup: boolean           = false;
    let newImage: NewImage                  = {
        lastPhotoX:    0,
        lastPhotoY:    0,
        lastPhotoSize: 0,
        imageFile:     undefined,
    };


    $: if (data.event.photo) {
        resetImage();
    }

    export function getNewImage(): NewImage {
        return newImage;
    }

    function changeImage(event: Event): void {
        const previewCleanup: () => void = () => {
            if (imagePreviewURL) {
                URL.revokeObjectURL(imagePreviewURL);
                imagePreviewURL = undefined;
            }
        };
        const cleanup: () => void        = () => {
            previewCleanup();
            newImage.imageFile = undefined;
        };

        if (!event.target) {
            cleanup();
            return;
        }
        const input = event.target as HTMLInputElement;

        if (!input.files || !input.files[0]) {
            cleanup();
            return;
        }

        newImage.imageFile = input.files[0];
        previewCleanup();
        if (newImage.imageFile) {
            imagePreviewURL  = URL.createObjectURL(newImage.imageFile);
            showCropperPopup = true;
        }
    }

    function resetImage(): void {
        newImage.imageFile = undefined;
        if (imagePreviewURL) {
            URL.revokeObjectURL(imagePreviewURL);
            imagePreviewURL = undefined;
        }
        if (imageInput) {
            imageInput.clear();
        }
    }

    function updateCropperData(e: typeof Cropper.prototype.$$events_def.cropcomplete): void {
        newImage.lastPhotoX    = e.detail.pixels.x;
        newImage.lastPhotoY    = e.detail.pixels.y;
        newImage.lastPhotoSize = e.detail.pixels.height;
    }

    onDestroy(() => {
        if (imagePreviewURL) {
            URL.revokeObjectURL(imagePreviewURL);
            imagePreviewURL = undefined;
        }
    });
</script>

{#if showCropperPopup && imagePreviewURL}
    <MyCropper
          discardCallback={resetImage}
          image={imagePreviewURL}
          on:cropcomplete={(e) => {
			updateCropperData(e);
		}}
          on:click={() => {
			setUnsavedChanges();
			showCropperPopup = false;
		}}
    />
{/if}

<FormWrapper classes="dashboard-speaker-event-form form-border"
             submitCallback={() => { dispatch('save'); }}
             useForm={displaySaveButton}
>
    {#if imagePreviewURL && newImage.imageFile}
        <div class="dashboard-speaker-event-cropped-image-wrapper">
            <CroppedImage
                  alt="Dein aktuelles Speaker-Bild für das Event {data.current.title}"
                  x={newImage.lastPhotoX}
                  y={newImage.lastPhotoY}
                  size={newImage.lastPhotoSize}
                  file={newImage.imageFile}
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
        <Input
              bind:this={imageInput}
              id="dashboard-speaker-event-image-input"
              labelText="Profilbild:"
              placeholderText="Profilbild"
              ariaLabel="Lade hier dein Profilbild für das Event {data.current.title} hoch"
              type="file"
              fileAccept=".jpg, .jpeg, .png"
              on:input={(event) => {
				// no setUnsavedChanges here because the cropper already does that.
				changeImage(event);
			}}
              value={newImage.imageFile}
        />
        <Paragraph classes="paragraph-gray">Lade hier dein Profilbild für deine Bewerbung hoch. Wenn deine
                                            Speaker-Bewerbung und später dein
                                            Vortrag angenommen werden, wird dieses Bild auf der Startseite angezeigt.
        </Paragraph>
        <div class="row-border" ></div>
        <Input
              id="dashboard-speaker-event-name-input"
              labelText="Name:"
              placeholderText="Name"
              ariaLabel="Gib hier deinen Namen für das Event {data.current.title} ein"
              bind:value={data.event.name}
              on:input={setUnsavedChanges}
        />
        <Paragraph classes="paragraph-gray">Unter diesem Namen tauchst du später auf der Hauptseite auf. Er muss nicht
                                            identisch zu dem Namen
                                            sein, mit dem du dich einloggst.
        </Paragraph>
        <div class="row-border" ></div>
        <Input
              id="dashboard-speaker-event-short-bio-input"
              labelText="Kurzbeschreibung:"
              placeholderText="Kurzbeschreibung"
              ariaLabel="Gib hier deine Kurzbeschreibung in Stichworten für das Event {data.current
				.title} ein"
              bind:value={data.event.short_bio}
              on:input={setUnsavedChanges}
        />
        <Paragraph classes="paragraph-gray">Deine Kurzbeschreibung sollte aus etwa drei bis fünf Stichpunkten bestehen,
                                            z. B. <i>„Unity Developer,
                                                     Game Designer”</i> oder <i>„Embedded- und Lowlevel-Coding”</i>.
        </Paragraph>
        <div class="row-border" ></div>
        <TextArea
              id="dashboard-speaker-event-bio-text-area"
              labelText="Beschreibung:"
              placeholderText="Beschreibung"
              ariaLabel="Gib hier deine Beschreibung für das Event {data.current.title} ein"
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
            <div class="row-border" ></div>
            <Button
                  type="submit"
                  ariaLabel="Klicke zum Speichern"
                  classes="button-text dashboard-speaker-event-submit-button">Speichern
            </Button>
        {/if}
    </div>
</FormWrapper>

<style>
    :global(.dashboard-speaker-event-form) {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }

    .input-grid {
        display:               grid;
        grid-template-columns: 1fr 1fr;
        gap:                   var(--full-gap);


    }

    :global(.input-grid > .paragraph-gray) {
        align-self: center;
    }

    .row-border {
        border-top:  1px solid var(--background-color-light);
        grid-column: 1 / 3;
    }

    :global(.dashboard-speaker-events-image) {
        max-height:    30rem;
        max-width:     30rem;
        align-self:    center;
        border:        1px solid var(--primary-color-dark);
        border-radius: var(--border-radius);
    }

    :global(.dashboard-speaker-event-submit-button) {
        margin:      0 auto;
        grid-column: 1 / 3;
    }

    .dashboard-speaker-event-cropped-image-wrapper {
        position:   relative;
        width:      fit-content;
        align-self: center;
    }

    :global(.dashboard-speaker-event-cropped-image-delete-button) {
        position: absolute;
        top:      -5%;
        right:    -7%;
        z-index:  1;
    }
</style>
