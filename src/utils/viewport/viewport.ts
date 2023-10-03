import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';

export const CanvasViewport = (app: PIXI.Application<HTMLCanvasElement>) => {
  const viewport = new Viewport({
    screenWidth: app.view.clientWidth,
    screenHeight: app.view.clientHeight,
    worldWidth: app.view.clientWidth,
    worldHeight: app.view.clientHeight,
    threshold: 0,
    passiveWheel: false,
    ticker: app.ticker,
    events: app.renderer.events,
  });

  border(viewport);
  console.log(viewport.drag);

  viewport
    .drag({
      mouseButtons: 'left',
    })
    .wheel({
      percent: 0,
      interrupt: true,
    });

  app.stage.addChild(viewport);

  let dragTarget: PIXI.Graphics | null = null;

  app.stage.eventMode = 'static';
  app.stage.addEventListener('pointerup', onDragEnd);
  app.stage.addEventListener('pointerupoutside', onDragEnd);

  const rect01 = new PIXI.Graphics();
  rect01.beginFill(0x00ffff).drawRect(-100, -100, 200, 200);

  rect01.eventMode = 'static';
  rect01.cursor = 'pointer';
  rect01.addEventListener('pointerdown', onDragStart);

  viewport.addChild(rect01);

  const rect02 = new PIXI.Graphics();
  rect02.beginFill(0x00ffff).drawRect(275, 25, 200, 200);
  viewport.addChild(rect02);

  viewport.addEventListener('moved', () => {
    restrainCorners(viewport);
  });

  return viewport;

  function onDragStart(this: PIXI.Graphics) {
    console.log('onDragStart');
    this.alpha = 0.5;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    dragTarget = this;
    app.stage.on('pointermove', onDragMove);
  }

  function onDragMove(event: PIXI.FederatedPointerEvent) {
    console.log('onDragMove');
    if (dragTarget) {
      dragTarget.parent.toLocal(event.global, undefined, dragTarget.position);
      console.log(dragTarget.position);
    }
  }

  function onDragEnd() {
    console.log('onDragEnd');
    if (dragTarget) {
      app.stage.off('pointermove', onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
    }
  }
};

function border(viewport: Viewport) {
  const line = viewport.addChild(new PIXI.Graphics());
  const GRID_LINES = 16;
  line
    .lineStyle(1, 0x000000)
    .drawRect(0, 0, viewport.worldWidth, viewport.worldHeight);
  for (let i = 1; i < GRID_LINES; i++) {
    line
      .moveTo((i * viewport.worldWidth) / GRID_LINES, 0)
      .lineTo((i * viewport.worldWidth) / GRID_LINES, viewport.worldHeight)
      .moveTo(0, (i * viewport.worldHeight) / GRID_LINES)
      .lineTo(viewport.worldWidth, (i * viewport.worldHeight) / GRID_LINES);
  }
}

function restrainCorners(viewport: Viewport) {
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
}
