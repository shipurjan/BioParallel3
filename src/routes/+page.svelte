<script lang="ts">
  import { AppShell, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { invoke } from '@tauri-apps/api/tauri';
  import { onMount } from 'svelte';
  import { appWindow, PhysicalSize } from '@tauri-apps/api/window';
  import TAURI_CONF_JSON from '@/src-tauri/tauri.conf.json';
  import WrappedCanvas from '@components/wrapped_canvas/WrappedCanvas.svelte';
  import Header from '@components/header/Header.svelte';

  if (TAURI_CONF_JSON.tauri.windows[0]) {
    void appWindow.setMinSize(
      new PhysicalSize(
        TAURI_CONF_JSON.tauri.windows[0].width,
        TAURI_CONF_JSON.tauri.windows[0].height
      )
    );
  }

  let valueSingle = 'books';

  onMount(() => {
    invoke('show_window');
  });
</script>

<AppShell scrollbarGutter="auto">
  <!-- (header) -->
  <svelte:fragment slot="sidebarLeft">
    <ListBox>
      <ListBoxItem bind:group={valueSingle} name="medium" value="books"
        >Books</ListBoxItem
      >
      <ListBoxItem bind:group={valueSingle} name="medium" value="movies"
        >Movies</ListBoxItem
      >
      <ListBoxItem bind:group={valueSingle} name="medium" value="tv"
        >TV</ListBoxItem
      >
    </ListBox>
  </svelte:fragment>
  <svelte:fragment slot="sidebarRight">
    <ListBox>
      <ListBoxItem bind:group={valueSingle} name="medium" value="books"
        >Books</ListBoxItem
      >
      <ListBoxItem bind:group={valueSingle} name="medium" value="movies"
        >Movies</ListBoxItem
      >
      <ListBoxItem bind:group={valueSingle} name="medium" value="tv"
        >TV</ListBoxItem
      >
    </ListBox>
  </svelte:fragment>
  <Header slot="header" />
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
