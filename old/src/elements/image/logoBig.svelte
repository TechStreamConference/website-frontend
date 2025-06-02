<script lang="ts">
    import Image from './image.svelte';

    export let classes: string = '';
</script>

<Image
      {classes}
      src={'/logo_big.png'}
      alt="Das große Tech Stream Conference Logo. Es zeigt den Schriftzug auf schwarzen Wolken. Aus den Wolken kommen schwarze Schaltkreise, an deren Enden gelbe Punkte sind. Test ist in Großbuchstaben und weiß / grün. conf in Kleinbuchstaben darunter und weiß."
/>
