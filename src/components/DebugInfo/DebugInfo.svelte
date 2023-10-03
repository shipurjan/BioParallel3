<script lang="ts">
  import type { Application } from 'pixi.js';
  import DebugLabel from './DebugLabel.svelte';
  import DebugRow from './DebugRow.svelte';
  import { round } from '@utils/math/round';
  import { onMount } from 'svelte';
  import type { Viewport } from 'pixi-viewport';

  export let app: Application<HTMLCanvasElement>;
  export let viewport: Viewport;

  onMount(() => {
    app.ticker.add(() => {
      app = app;
      viewport = viewport;
    });
  });
</script>

<div class={$$restProps.class || ''}>
  <DebugRow title="app.screen">
    <DebugLabel title={'top'} value={`${round(app.screen.top, 2)}`} />
    <DebugLabel title={'right'} value={`${round(app.screen.right, 2)}`} />
    <DebugLabel title={'bottom'} value={`${round(app.screen.bottom, 2)}`} />
    <DebugLabel title={'left'} value={`${round(app.screen.left, 2)}`} />
    <DebugLabel
      title={'size'}
      value={`${round(app.screen.height, 2)}x${round(app.screen.width, 2)}`}
    />
    <DebugLabel
      title={'position'}
      value={`(${round(app.screen.x, 2)},${round(app.screen.y, 2)})`}
    />
  </DebugRow>

  <DebugRow title="app.ticker">
    <DebugLabel title={'FPS'} value={`${round(app.ticker.FPS, 2)}`} />
    <DebugLabel title={'maxFPS'} value={`${round(app.ticker.maxFPS, 2)}`} />
    <DebugLabel title={'minFPS'} value={`${round(app.ticker.minFPS, 2)}`} />
    <DebugLabel title={'deltaMS'} value={`${round(app.ticker.deltaMS, 2)}`} />
    <DebugLabel
      title={'deltaTime'}
      value={`${round(app.ticker.deltaTime, 2)}`}
    />
    <DebugLabel title={'count'} value={`${round(app.ticker.count, 2)}`} />
    <DebugLabel title={'lastTime'} value={`${round(app.ticker.lastTime, 2)}`} />
    <DebugLabel
      title={'elapsedMS'}
      value={`${round(app.ticker.elapsedMS, 2)}`}
    />
    <DebugLabel title={'speed'} value={`${round(app.ticker.speed, 2)}`} />
  </DebugRow>

  <DebugRow title="app.stage">
    <DebugLabel
      title={'size'}
      value={`${round(app.stage.width, 2)}x${round(app.stage.height, 2)}`}
    />
    <DebugLabel
      title={'position'}
      value={`(${round(app.stage.x, 2)}, ${round(app.stage.y, 2)})`}
    />
  </DebugRow>

  <DebugRow title="viewport">
    <DebugLabel title={'top'} value={`${round(viewport.top, 2)}`} />
    <DebugLabel title={'right'} value={`${round(viewport.right, 2)}`} />
    <DebugLabel title={'bottom'} value={`${round(viewport.bottom, 2)}`} />
    <DebugLabel title={'left'} value={`${round(viewport.left, 2)}`} />
    <DebugLabel
      title={'size'}
      value={`${round(viewport.width, 2)}x${round(viewport.height, 2)}`}
    />
    <DebugLabel
      title={'center'}
      value={`(${round(viewport.center.x, 2)}, ${round(viewport.center.y, 2)})`}
    />
    <DebugLabel
      title={'position'}
      value={`(${round(viewport.x, 2)}, ${round(viewport.y, 2)})`}
    />
    <DebugLabel
      title={'corner'}
      value={`(${round(viewport.corner.x, 2)}, ${round(viewport.corner.y, 2)})`}
    />
    <DebugLabel
      title={'worldSize'}
      value={`${round(viewport.worldWidth, 2)}x${round(
        viewport.worldHeight,
        2
      )}`}
    />
    <DebugLabel
      title={'worldScreenSize'}
      value={`${round(viewport.worldScreenWidth, 2)}x${round(
        viewport.worldScreenHeight,
        2
      )}`}
    />
    <DebugLabel title={'scaled'} value={`${round(viewport.scaled, 5)}`} />
    <DebugLabel title={'zIndex'} value={`${viewport.zIndex}`} />
  </DebugRow>
</div>
