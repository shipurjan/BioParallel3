<script lang="ts">
  import { CanvasApplication } from '@utils/canvas/app';
  import { onMount } from 'svelte';
  import {
    CanvasViewport,
    removeViewportEventListeners,
  } from '@utils/viewport/viewport';

  let container: HTMLDivElement;
  onMount(() => {
    const app = CanvasApplication(container);
    const viewport = CanvasViewport(app);

    return () => {
      container.remove();
      removeViewportEventListeners(viewport);
      viewport.destroy();
      app.destroy(true);
    };
  });
</script>

<div class=" h-[700px] w-[1260px]" bind:this={container}></div>
