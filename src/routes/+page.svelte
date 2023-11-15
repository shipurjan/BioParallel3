<script lang="ts">
  import { AppShell } from '@skeletonlabs/skeleton';
  import { invoke } from '@tauri-apps/api/tauri';
  import { onMount } from 'svelte';
  import { appWindow, PhysicalSize } from '@tauri-apps/api/window';
  import TAURI_CONF_JSON from '@/src-tauri/tauri.conf.json';
  import WrappedCanvas from '@components/wrapped_canvas/WrappedCanvas.svelte';
  import Header from '@components/header/Header.svelte';
  import { canvasInstances } from '../lib/stores/canvasInstancesStore';
  import MarkerListBox from '@components/marker_listbox/MarkerListBox.svelte';

  if (TAURI_CONF_JSON.tauri.windows[0]) {
    void appWindow.setMinSize(
      new PhysicalSize(
        TAURI_CONF_JSON.tauri.windows[0].width,
        TAURI_CONF_JSON.tauri.windows[0].height
      )
    );
  }

  let leftSideCanvasMarker: string;
  let rightSideCanvasMarker: string;

  $: leftSideCanvasMarkerList =
    $canvasInstances[0]?.markersViewport?.children ?? [];
  $: rightSideCanvasMarkerList =
    $canvasInstances[1]?.markersViewport?.children ?? [];

  $: if (leftSideCanvasMarkerList[0])
    console.log(leftSideCanvasMarkerList[0].transform.position._x);

  onMount(() => {
    invoke('show_window');
  });
</script>

<AppShell scrollbarGutter="auto">
  <!-- (header) -->
  <svelte:fragment slot="sidebarLeft">
    <MarkerListBox
      markerList={leftSideCanvasMarkerList}
      selectedMarker={leftSideCanvasMarker}
    />
  </svelte:fragment>
  <svelte:fragment slot="sidebarRight">
    <MarkerListBox
      markerList={rightSideCanvasMarkerList}
      selectedMarker={rightSideCanvasMarker}
    />
  </svelte:fragment>
  <Header slot="header" />
  <!-- Router Slot -->
  <div
    class="align-center flex h-full w-full flex-row items-center justify-center gap-2 p-2 align-middle"
  >
    {#each $canvasInstances as canvasInstance}
      <WrappedCanvas {canvasInstance} />
    {/each}
  </div>

  <!-- ---- / ---- -->
  <svelte:fragment slot="footer">Page footer</svelte:fragment>
  <!-- (footer) -->
</AppShell>
