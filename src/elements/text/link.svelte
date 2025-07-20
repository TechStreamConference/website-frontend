<script lang="ts">
    export let title: string;

    export let classes: string = 'link-standard';
    export let href: string = '';
    export let newTab: boolean = false;
    export let font: string = 'normal-font';
</script>

<a {href}
   class="{font} {classes}"
   target={newTab ? '_blank' : ''}
   rel="noopener noreferrer"
   {title}
   on:click>
    <slot/>
</a>

<style>
    a {
        font-size: var(--full-font-size);
        line-height: var(--full-line-height);
        text-align: var(--text-align);
        align-self: center;
        padding: var(--quad-padding);
        border-radius: var(--border-radius);
        background-color: transparent;
        text-decoration: none;
    }

    .link-standard {
        transition: background-color var(--transition-duration);
    }

    .link-standard:hover {
        background-color: var(--primary-color-dark);
        transition: background-color var(--transition-duration);
    }

    .link-inline {
        transition: color var(--transition-duration) text-decoration-color var(--transition-duration);
        border-radius: 0;
        text-decoration: underline;
        text-decoration-color: var(--primary-color-light);
    }

    .link-inline:hover {
        color: var(--primary-color-dark);
        transition: color var(--transition-duration);
    }

    .link-inline:active {
        text-decoration-color: var(--line-color);
        transition: text-decoration-color var(--transition-duration);
    }

    .link-white {
        color: var(--white-color);
    }

    .word-break {
        word-break: break-all;
    }
</style>
