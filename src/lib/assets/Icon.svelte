<script lang="ts">
    import '@fortawesome/fontawesome-free/css/all.min.css';

    export let type: string;

    export let classes: string = '';
    export let color: 'standard-color' | 'red' | 'green' | 'orange' = 'standard-color';

    import {icon_lookup} from '@/lookup/iconLookup';
</script>

<i class="fa {icon_lookup(type)} {classes} {color}"
   aria-hidden="true"/>

<style>
    i {
        display: inline-block;
        font-size: var(--1-5x-font-size);
    }

    .standard-color {
        color: var(--secondary-color);
    }

    .red {
        color: red;
    }

    .green {
        color: green;
    }

    .orange {
        color: orange;
    }

    .white-only {
        color: var(--white-color);
        background: transparent !important;
    }

    .text-color-only {
        color: var(--text-color);
        background: transparent !important;
    }
</style>
