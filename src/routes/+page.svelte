<script lang="ts">
  import Canvas from '@components/Canvas.svelte';
  import { invoke } from '@tauri-apps/api/tauri';
  import { onMount } from 'svelte';

  onMount(() => {
    invoke('show_window');
  });
</script>

<div
  class="align-center flex h-[100dvh] w-[100dvw] flex-col items-center gap-2 p-2"
>
  <h1 class="text-3xl font-light">Welcome to SvelteKit</h1>
  <h1 class="text-3xl font-normal">Welcome to SvelteKit</h1>
  <h1 class="text-3xl font-bold">Welcome to SvelteKit</h1>
  <h1 class="text-3xl font-black">Welcome to SvelteKit</h1>
  <Canvas />
</div>
