<script lang="ts">
    import {type_workaround} from '@/types/typeWorkaround';

    export let ariaLabel: string;

    export let classes: string = '';
    export let type: string = 'button';

    export let fontSize: 'small-text' | 'medium-text' | 'large-text' = 'medium-text';
    export let buttonSize: 'small-button' | 'medium-button' | 'large-button' = 'medium-button';
</script>

<button
        class="hover-move {classes} {fontSize} {buttonSize}"
        use:type_workaround={type}
        on:click
        aria-label={ariaLabel}
>
    <span class="normal-font">
        <slot/>
    </span>
</button>

<style>
    button {
        background-color: var(--primary-color-light);
        border: none;
        border-radius: var(--border-radius);
        justify-self: center;
    }

    span {
        text-align: var(--text-align);
        color: var(--white-color);
    }

    .small-text {
        font-size: var(--half-font-size);
    }

    .medium-text {
        font-size: var(--full-font-size);
    }

    .large-text {
        font-size: var(--4x-font-size);
    }

    .small-button {
        padding: var(--full-padding) var(--2x-padding);
    }

    .medium-button {
        padding: var(--2x-padding) var(--4x-padding);
    }

    .big-button {
        padding: var(--4x-padding) var(--8x-padding);
    }

    .center-button {
        align-self: center;
    }
</style>
