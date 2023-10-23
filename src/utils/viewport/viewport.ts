import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import { loadSprite } from './loadSprite';

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

  viewport.addEventListener('moved', () => {
    restrainCorners(viewport);
  });

  return viewport;

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
