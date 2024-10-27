<script lang="ts">
	export let classes: string = '';

	export let size: string = 'big';
</script>

<h2 class="headline-font {size} {classes}"><slot /></h2>

<style>
	h2 {
		text-align: center;
	}
  .big {
      font-size: var(--4x-font-size);
      line-height: var(--4x-line-height);
  }
  .small {
      font-size: var(--2x-font-size);
      line-height: var(--2x-line-height);
  }
	.border {
		border-bottom: 1px solid var(--line-color);
	}

  @media (max-width: 600px) {
      .big {
          font-size: var(--2x-font-size);
          line-height: var(--2x-line-height);
      }
      .small {
          font-size: var(--full-font-size);
          line-height: var(--full-line-height);
      }
  }
</style>
