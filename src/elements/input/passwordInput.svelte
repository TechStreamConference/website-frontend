<script>
	export let placeholderText = '';
    export let value = "";
</script>

<input type="password" name="input" placeholder={placeholderText} on:input bind:value />
