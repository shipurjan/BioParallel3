<script lang="ts">
  import type { Application } from 'pixi.js';
  import type { Viewport } from 'pixi-viewport';
  import { CanvasApplication } from '@utils/canvas/app';
  import { onMount } from 'svelte';
  import {
    CanvasViewport,
    removeViewportEventListeners,
  } from '@utils/viewport/viewport';
  import { getDroppedFileData } from '@utils/canvas/getDroppedFileData';
  import { addSprite } from '@utils/viewport/addSprite';
  import { loadSprite } from '@utils/viewport/loadSprite';

  let container: HTMLDivElement;
  let app: Application<HTMLCanvasElement>;
  let viewport: Viewport;

  onMount(() => {
    app = CanvasApplication(container);
    viewport = CanvasViewport(app);

    return () => {
      container.remove();
      removeViewportEventListeners(viewport);
      viewport.destroy();
      app.destroy(true);
    };
  });
</script>

<div
  class=" h-[400px] w-[400px]"
  bind:this={container}
  role="presentation"
  on:dragenter|preventDefault={() => {
    console.log('dragenter');
  }}
  on:dragover|preventDefault={() => {
    console.log('dragover');
  }}
  on:dragleave|preventDefault={() => {
    console.log('dragleave');
  }}
  on:drop={(event) => {
    getDroppedFileData(event).then((imageData) => {
      if (!imageData) return;
      loadSprite(imageData).then((sprite) => {
        if (!sprite) return;
        addSprite(viewport, sprite);
      });
    });
  }}
></div>
