<script lang="ts">
  import { AppShell, LightSwitch } from '@skeletonlabs/skeleton';
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

<AppShell scrollbarGutter="auto">
  <!-- (header) -->
  <svelte:fragment slot="sidebarLeft">Left Sidebar</svelte:fragment>
  <svelte:fragment slot="sidebarRight">Right Sidebar</svelte:fragment>
  <svelte:fragment slot="header">
    <LightSwitch />
  </svelte:fragment>
  <!-- Router Slot -->
  <div
    class="align-center flex h-full w-full flex-row items-center justify-evenly gap-2 p-2 align-middle"
  >
    <WrappedCanvas />
    <WrappedCanvas />
  </div>

  <!-- ---- / ---- -->
  <svelte:fragment slot="footer">Page footer</svelte:fragment>
  <!-- (footer) -->
</AppShell>
