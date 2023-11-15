import { Group, Layer } from '@pixi/layers';
import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';

export const createBaseCanvasViewport = (
  app: PIXI.Application<HTMLCanvasElement>
) => {
  const baseViewport = new Viewport({
    screenWidth: app.view.clientWidth,
    screenHeight: app.view.clientHeight,
    worldWidth: app.view.clientWidth,
    worldHeight: app.view.clientHeight,
    threshold: 2,
    passiveWheel: false,
    ticker: app.ticker,
    events: app.renderer.events,
  })
    .drag({
      mouseButtons: 'middle-left',
    })
    .wheel({
      percent: 0,
      interrupt: true,
    })
    .clampZoom({
      minScale: 0.5,
    });

  const viewportLayer = new Layer(new Group(1, true)); // zIndex = 1
  viewportLayer.addChild(baseViewport);

  app.stage.addChild(viewportLayer);

  baseViewport.fit();
  baseViewport.moveCenter(
    baseViewport.worldWidth / 2,
    baseViewport.worldHeight / 2
  );

  addViewportBorder();

  return baseViewport;

  function addViewportBorder() {
    const line = baseViewport.addChild(new PIXI.Graphics());
    const GRID_LINES = 16;
    line
      .lineStyle(1, 0x000000)
      .drawRect(0, 0, baseViewport.worldWidth, baseViewport.worldHeight);
    for (let i = 1; i < GRID_LINES; i++) {
      line
        .moveTo((i * baseViewport.worldWidth) / GRID_LINES, 0)
        .lineTo(
          (i * baseViewport.worldWidth) / GRID_LINES,
          baseViewport.worldHeight
        )
        .moveTo(0, (i * baseViewport.worldHeight) / GRID_LINES)
        .lineTo(
          baseViewport.worldWidth,
          (i * baseViewport.worldHeight) / GRID_LINES
        );
    }
  }
};
