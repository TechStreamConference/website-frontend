<script lang="ts">
    import logo from "@/assets/logo_big.png"
    import Image from '@/lib/assets/Image.svelte';

    export let classes: string = '';
</script>

<Image
      {classes}
      src={logo}
      alt="Das große Tech Stream Conference Logo. Es zeigt den Schriftzug auf schwarzen Wolken. Aus den Wolken kommen schwarze Schaltkreise, an deren Enden gelbe Punkte sind. Test ist in Großbuchstaben und weiß / grün. conf in Kleinbuchstaben darunter und weiß."
/>
