<script lang="ts">
  import Canvas from '@components/Canvas.svelte';
  import { invoke } from '@tauri-apps/api/tauri';
  import { onMount } from 'svelte';
  import { listen } from '@tauri-apps/api/event';

  onMount(() => {
    invoke('show_window');
    listen('tauri://file-drop-hover', (event) => {
      console.log(event);
    });
  });
</script>

<div
  class="align-center flex h-full w-full flex-row items-center justify-center gap-2 bg-red-500 p-2 align-middle"
>
  <Canvas />
  <Canvas />
</div>
