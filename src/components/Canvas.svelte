<script lang="ts">
  import { spring } from 'svelte/motion';

  import type { Application } from 'pixi.js';
  import type { Viewport } from 'pixi-viewport';
  import { CanvasApplication } from '@utils/canvas/app';
  import { onMount } from 'svelte';
  import { CanvasViewport } from '@utils/viewport/viewport';
  import { getDroppedFileData } from '@utils/canvas/getDroppedFileData';
  import { addSprite } from '@utils/viewport/addSprite';
  import { loadSprite } from '@utils/viewport/loadSprite';
  import DebugInfo from './DebugInfo/DebugInfo.svelte';

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

  onMount(() => {
    app = CanvasApplication(container);
    viewport = CanvasViewport(app);
    if (spriteUrl !== null) {
      loadSprite(spriteUrl).then((sprite) => {
        if (!sprite) return;
        viewport.addChild(sprite);
      });
    }

    return () => {
      container.remove();
      viewport.destroy();
      app.destroy(true);
    };
  });
</script>

<div class="flex flex-col">
  {#if import.meta.env.DEV && app && viewport}
    <DebugInfo
      {app}
      {viewport}
      class="box-content grid max-h-[225px] min-h-[225px] w-[600px] grid-cols-[fit-content(0px),auto] gap-[1px] bg-slate-900 text-center text-[0.6rem] text-white outline outline-2 outline-slate-900"
    />
  {/if}

  <div
    style="filter: blur({$blurSpring}px) sepia({$colorSpring}) grayscale({$colorSpring})"
    class=" h-[600px] w-[600px] outline outline-2"
    bind:this={container}
    role="presentation"
    on:dragenter|preventDefault={toggleTransform}
    on:dragleave|preventDefault={toggleTransform}
    on:drop|preventDefault={(event) => {
      toggleTransform();
      getDroppedFileData(event).then((imageData) => {
        if (!imageData) return;
        loadSprite(imageData).then((sprite) => {
          if (!sprite) return;
          addSprite(viewport, sprite);
        });
      });
    }}
  ></div>
</div>
