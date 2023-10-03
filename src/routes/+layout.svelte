<script>
  import '../app.css';
</script>

<svelte:window
  on:dragover|preventDefault
  on:drop|preventDefault
  on:contextmenu|preventDefault|capture
  on:selectstart|preventDefault|capture
/>

<slot />
