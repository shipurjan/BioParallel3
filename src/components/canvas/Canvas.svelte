<script lang="ts">
  import { spring } from 'svelte/motion';

  import type { Application } from 'pixi.js';
  import type { Viewport } from 'pixi-viewport';
  import { CanvasApplication } from '@controllers/canvas/canvas';
  import { onMount } from 'svelte';
  import { CanvasViewport } from '@controllers/viewport/viewport';
  import { getDroppedFileData } from '@utils/canvas/getDroppedFileData';
  import DebugInfo from './DebugInfo/DebugInfo.svelte';
  import { addForensicTraceImageSpriteToViewport } from '@utils/canvas/addForensicTraceImageSpriteToViewport';

  export let spriteUrl: null | string = null;
  let container: HTMLDivElement;
  let app: Application<HTMLCanvasElement>;
  let viewport: Viewport;
  const blurSpring = spring(0, { stiffness: 0.2, damping: 0.8 });
  const colorSpring = spring(0, { stiffness: 0.2, damping: 0.8 });
  const toggleTransform = () => {
    blurSpring.update((val) => (val === 0 ? 1 : 0));
    return colorSpring.update((val) => (val === 0 ? 0.5 : 0));
  };

  $: if (spriteUrl !== null) {
    addForensicTraceImageSpriteToViewport(viewport, spriteUrl);
  }

  onMount(() => {
    app = CanvasApplication(container);
    viewport = CanvasViewport(app);

    return () => {
      container.remove();
      viewport.destroy();
      app.destroy(true);
    };
  });
</script>

<div class="flex w-[500px] flex-col outline outline-2">
  {#if import.meta.env.DEV && app && viewport}
    <DebugInfo
      {app}
      {viewport}
      class="box-border grid w-full grid-cols-[fit-content(0px),auto] gap-[1px] bg-surface-900 p-2 text-center text-[0.6rem] text-tertiary-50"
    />
  {/if}

  <div
    style="filter: blur({$blurSpring}px) sepia({$colorSpring}) grayscale({$colorSpring})"
    class=" h-[500px] w-full"
    bind:this={container}
    role="presentation"
    on:dragenter|preventDefault={toggleTransform}
    on:dragleave|preventDefault={toggleTransform}
    on:drop|preventDefault={(event) => {
      toggleTransform();
      getDroppedFileData(event).then((imageData) => {
        addForensicTraceImageSpriteToViewport(viewport, imageData);
      });
    }}
  ></div>
</div>
