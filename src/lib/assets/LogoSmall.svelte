<script lang="ts">
    import Image from '@/lib/assets/Image.svelte';
    import logo from '@/assets/logo_small.png'

    export let classes: string = '';
</script>

<Image
        {classes}
        src={logo}
        alt="Das kleine Tech Stream Conference Logo. Es zeigt den Schriftzug auf schwarzen Wolken. Test ist in Großbuchstaben und weiß / grün. conf in Kleinbuchstaben darunter und weiß."
/>
