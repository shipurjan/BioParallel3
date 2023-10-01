<script>
  import '../app.css';
</script>

<svelte:window
  role="presentation"
  on:dragenter|preventDefault
  on:dragover|preventDefault
  on:dragleave|preventDefault
  on:drop|preventDefault
/>

<slot />
