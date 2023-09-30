<script lang="ts">
  import Canvas from '@components/Canvas.svelte';
  import { invoke } from '@tauri-apps/api/tauri';
  import { onMount } from 'svelte';

  onMount(() => {
    invoke('show_window');
  });
</script>

<div
  class="align-center flex h-full w-full flex-row items-center justify-center gap-2 p-2 align-middle"
>
  <Canvas />
</div>
