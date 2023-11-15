<script lang="ts">
  import { spring } from 'svelte/motion';

  import { onMount } from 'svelte';
  import { getDroppedFileData } from '@utils/canvas/getDroppedFileData';
  import DebugInfo from './DebugInfo/DebugInfo.svelte';
  import { addForensicTraceImageSpriteToViewport } from '@utils/canvas/addForensicTraceImageSpriteToViewport';
  import {
    canvasInstances,
    type CanvasInstance,
  } from '@/src/lib/stores/canvasInstancesStore';
  import { addBaseCanvasViewportEventListeners } from '@components/layers/baseViewport/addBaseCanvasViewportEventListeners';
  import { Stage } from '@pixi/layers';
  import { createBaseCanvasViewport } from '@components/layers/baseViewport/createBaseCanvasViewport';
  import { createMarkersCanvasViewport } from '@components/layers/markersViewport/createMarkersCanvasViewport';

  export let spriteUrl: null | string = null;
  export let canvasInstance: CanvasInstance;
  let { id, app, baseViewport, markersViewport } = canvasInstance;

  let container: HTMLDivElement;

  const blurSpring = spring(0, { stiffness: 0.2, damping: 0.8 });
  const colorSpring = spring(0, { stiffness: 0.2, damping: 0.8 });
  const toggleTransform = () => {
    blurSpring.update((val) => (val === 0 ? 1 : 0));
    return colorSpring.update((val) => (val === 0 ? 0.5 : 0));
  };

  $: if (spriteUrl !== null && baseViewport !== null) {
    addForensicTraceImageSpriteToViewport(baseViewport, spriteUrl);
  }

  onMount(() => {
    app.resizeTo = container;
    container.appendChild(app.view);
    app.stage = new Stage();
    app.stage.sortableChildren = true;
    markersViewport = createMarkersCanvasViewport(app);
    baseViewport = createBaseCanvasViewport(app);

    canvasInstances.update((previous) => {
      return previous.map((props) =>
        props.id !== id
          ? props
          : {
              ...props,
              markersViewport,
              baseViewport,
            }
      );
    });

    addBaseCanvasViewportEventListeners(id, baseViewport, markersViewport);

    return () => {
      container.remove();
      markersViewport?.destroy();
      baseViewport?.destroy();
      app.destroy(true);
    };
  });
</script>

<div class="flex w-[500px] flex-col outline outline-2">
  {#if import.meta.env.DEV && app && baseViewport && markersViewport}
    <DebugInfo
      {app}
      viewport={baseViewport}
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
    on:drop|preventDefault={(event) => {
      toggleTransform();
      getDroppedFileData(event).then((imageData) => {
        if (!baseViewport) return;
        addForensicTraceImageSpriteToViewport(baseViewport, imageData);
      });
    }}
  ></div>
</div>
