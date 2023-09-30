<script lang="ts">
  import * as PIXI from 'pixi.js';
  import { Viewport } from 'pixi-viewport';
  import { CanvasApplication } from '@utils/canvas/app';
  import { onMount } from 'svelte';

  let container: HTMLDivElement;
  onMount(() => {
    const app = CanvasApplication(container);
    container.appendChild(app.view);

    const viewport = new Viewport({
      screenWidth: container.clientWidth,
      screenHeight: container.clientHeight,
      worldWidth: container.clientWidth,
      worldHeight: container.clientHeight,
      threshold: 0,
      passiveWheel: false,
      events: app.renderer.events,
    });

    function border(viewport: Viewport) {
      const line = viewport.addChild(new PIXI.Graphics());
      line
        .lineStyle(2, 0x000000)
        .drawRect(0, 0, viewport.worldWidth, viewport.worldHeight)
        .moveTo(viewport.worldWidth / 2, 0)
        .lineTo(viewport.worldWidth / 2, viewport.worldHeight)
        .moveTo(0, viewport.worldHeight / 2)
        .lineTo(viewport.worldWidth, viewport.worldHeight / 2);
    }

    border(viewport);

    viewport.drag().wheel({
      percent: 0,
      interrupt: true,
    });

    const adjustClamp = () => {
      if (viewport.scaled > 1) {
        return;
      }
    };

    const restrainCorners = () => {
      if (viewport.scaled > 1) {
        // Top border is touched
        if (viewport.top < 0) viewport.moveCorner(viewport.left, 0);

        // Bottom border is touched
        if (viewport.bottom > viewport.screenHeight)
          viewport.moveCorner(
            viewport.left,
            -(viewport.screenHeightInWorldPixels - viewport.screenHeight)
          );

        // Left border is touched
        if (viewport.left < 0) viewport.moveCorner(0, viewport.top);

        // Right border is touched
        if (viewport.right > viewport.screenWidth)
          viewport.moveCorner(
            -(viewport.screenWidthInWorldPixels - viewport.screenWidth),
            viewport.top
          );
        return;
      }

      // Top border is touched
      if (viewport.top > 0) viewport.moveCorner(viewport.left, 0);

      // Bottom border is touched
      if (viewport.bottom < viewport.screenHeight)
        viewport.moveCorner(
          viewport.left,
          -(viewport.screenHeightInWorldPixels - viewport.screenHeight)
        );

      // Left border is touched
      if (viewport.left > 0) viewport.moveCorner(0, viewport.top);

      // Right border is touched
      if (viewport.right < viewport.screenWidth)
        viewport.moveCorner(
          -(viewport.screenWidthInWorldPixels - viewport.screenWidth),
          viewport.top
        );
    };

    viewport.addEventListener('moved', restrainCorners);
    viewport.addEventListener('zoomed-end', adjustClamp);

    app.stage.addChild(viewport);

    const createSquareSprite = (position: [number, number], size: number) => {
      const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
      sprite.tint = 0xff0000;
      sprite.width = sprite.height = size;
      sprite.position.set(position[0], position[1]);
      return sprite;
    };

    const SIZE = 20;
    viewport.addChild(createSquareSprite([0, 0], SIZE));
    viewport.addChild(
      createSquareSprite([0, viewport.worldHeight - SIZE], SIZE)
    );
    viewport.addChild(
      createSquareSprite([viewport.worldWidth - SIZE, 0], SIZE)
    );
    viewport.addChild(
      createSquareSprite(
        [viewport.worldWidth - SIZE, viewport.worldHeight - SIZE],
        SIZE
      )
    );

    return () => {
      container.remove();
      viewport.removeEventListener('moved', restrainCorners);
      viewport.removeEventListener('zoomed-end', adjustClamp);
      viewport.destroy();
      app.destroy(true);
    };
  });
</script>

<div class=" h-[300px] w-[500px]" bind:this={container}></div>
