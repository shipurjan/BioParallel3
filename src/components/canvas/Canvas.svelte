<script lang="ts">
  import * as PIXI from 'pixi.js';
  import { spring } from 'svelte/motion';

  import { Stage } from '@pixi/layers';
  import type { Application } from 'pixi.js';
  import type { Viewport } from 'pixi-viewport';
  import { CanvasApplication } from '@controllers/canvas/canvas';
  import { onMount } from 'svelte';
  import { CanvasViewport } from '@controllers/canvas/viewport/viewport';
  import { getDroppedFileData } from '@utils/canvas/getDroppedFileData';
  import DebugInfo from './DebugInfo/DebugInfo.svelte';
  import { addForensicTraceImageSpriteToViewport } from '@utils/canvas/addForensicTraceImageSpriteToViewport';
  import { MarkersViewport } from '@controllers/markers/viewport/viewport';

  export let spriteUrl: null | string = null;
  let container: HTMLDivElement;
  let app: Application<HTMLCanvasElement>;
  let viewport: Viewport;
  let markersViewport: Viewport;

  const blurSpring = spring(0, { stiffness: 0.2, damping: 0.8 });
  const colorSpring = spring(0, { stiffness: 0.2, damping: 0.8 });
  const toggleTransform = () => {
    blurSpring.update((val) => (val === 0 ? 1 : 0));
    return colorSpring.update((val) => (val === 0 ? 0.5 : 0));
  };

  const addMarker = (
    event: MouseEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    }
  ) => {
    const currentTargetRect = event.currentTarget.getBoundingClientRect();
    const mousePos = {
      x: event.pageX - window.scrollX - currentTargetRect.left,
      y: event.pageY - window.scrollY - currentTargetRect.top,
    };
    const clickedOnViewportWorld =
      mousePos.x >= viewport.position.x &&
      mousePos.x <= viewport.position.x + viewport.width &&
      mousePos.y >= viewport.position.y &&
      mousePos.y <= viewport.position.y + viewport.height;

    if (!clickedOnViewportWorld) return;

    let frame = new PIXI.Graphics();
    frame.beginFill(0xff0000);
    frame.drawCircle(0, 0, 3);
    frame.position.set(mousePos.x - viewport.x, mousePos.y - viewport.y);
    markersViewport.addChild(frame);
  };

  $: if (spriteUrl !== null) {
    addForensicTraceImageSpriteToViewport(viewport, spriteUrl);
  }

  onMount(() => {
    app = CanvasApplication(container);
    app.stage = new Stage();
    app.stage.sortableChildren = true;
    markersViewport = MarkersViewport(app);
    viewport = CanvasViewport(app, markersViewport);

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
      {markersViewport}
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
    on:click|preventDefault={addMarker}
    on:drop|preventDefault={(event) => {
      toggleTransform();
      getDroppedFileData(event).then((imageData) => {
        addForensicTraceImageSpriteToViewport(viewport, imageData);
      });
    }}
  ></div>
</div>
