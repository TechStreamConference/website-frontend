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

<FormWrapper classes="dashboard-speaker-event-form"
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
    <Input
          bind:this={imageInput}
          id="dashboard-speaker-event-image-input"
          labelText="Bild:"
          placeholderText="Bild"
          ariaLabel="Lade hier dein Bild für das Event {data.current.title} hoch"
          type="file"
          fileAccept=".jpg, .jpeg, .png"
          on:input={(event) => {
				// no setUnsavedChanges here because the cropper already does that.
				changeImage(event);
			}}
          value={newImage.imageFile}
    />
    <Input
          id="dashboard-speaker-event-name-input"
          labelText="Name:"
          placeholderText="Name"
          ariaLabel="Gib hier deinen Namen für das Event {data.current.title} ein"
          bind:value={data.event.name}
          on:input={setUnsavedChanges}
    />
    <Input
          id="dashboard-speaker-event-short-bio-input"
          labelText="Kurzbeschreibung:"
          placeholderText="Kurzbeschreibung"
          ariaLabel="Gib hier deine Kurzbeschreibung in Stichworten für das Event {data.current
				.title} ein"
          bind:value={data.event.short_bio}
          on:input={setUnsavedChanges}
    />
    <TextArea
          id="dashboard-speaker-event-bio-text-area"
          labelText="Beschreibung:"
          placeholderText="Beschreibung"
          ariaLabel="Gib hier deine Beschreibung für das Event {data.current.title} ein"
          bind:value={data.event.bio}
          on:input={setUnsavedChanges}
    />
    {#if displaySaveButton}
        <Button
              type="submit"
              ariaLabel="Klicke zum Speichern"
              classes="button-text dashboard-speaker-event-submit-button">Speichern
        </Button>
    {/if}
</FormWrapper>

<style>
    :global(.dashboard-speaker-event-form) {
        display:        flex;
        flex-direction: column;
        gap:            var(--full-gap);
    }

    :global(.dashboard-speaker-events-image) {
        max-height:    30rem;
        max-width:     30rem;
        align-self:    center;
        border:        1px solid var(--primary-color-dark);
        border-radius: var(--border-radius);
    }

    :global(.dashboard-speaker-event-submit-button) {
        margin: auto;
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
