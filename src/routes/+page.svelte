<script lang="ts">
  import Canvas from '@components/Canvas.svelte';
  import { invoke } from '@tauri-apps/api/tauri';
  import { onMount } from 'svelte';
  import { appWindow, PhysicalSize } from '@tauri-apps/api/window';
  import TAURI_CONF_JSON from '@/src-tauri/tauri.conf.json';
  void appWindow.setMinSize(
    new PhysicalSize(
      TAURI_CONF_JSON.tauri.windows[0].width,
      TAURI_CONF_JSON.tauri.windows[0].height
    )
  );

  onMount(() => {
    invoke('show_window');
  });
</script>

<div
  class="align-center flex h-full w-full flex-row items-center justify-center gap-2 bg-slate-500 p-2 align-middle"
>
  <Canvas />
  <Canvas />
</div>
