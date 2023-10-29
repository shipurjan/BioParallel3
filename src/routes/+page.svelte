<script lang="ts">
  import { invoke } from '@tauri-apps/api/tauri';
  import { onMount } from 'svelte';
  import { appWindow, PhysicalSize } from '@tauri-apps/api/window';
  import TAURI_CONF_JSON from '@/src-tauri/tauri.conf.json';
  import WrappedCanvas from '@components/wrapped_canvas/WrappedCanvas.svelte';
  if (TAURI_CONF_JSON.tauri.windows[0]) {
    void appWindow.setMinSize(
      new PhysicalSize(
        TAURI_CONF_JSON.tauri.windows[0].width,
        TAURI_CONF_JSON.tauri.windows[0].height
      )
    );
  }

  onMount(() => {
    invoke('show_window');
  });
</script>

<div
  class="align-center flex h-full w-full flex-row items-center justify-center gap-2 p-2 align-middle"
>
  <WrappedCanvas />
  <WrappedCanvas />
</div>
