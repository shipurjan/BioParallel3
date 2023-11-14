import { Group, Layer } from '@pixi/layers';
import { Viewport } from 'pixi-viewport';
import type * as PIXI from 'pixi.js';

export const MarkersViewport = (app: PIXI.Application<HTMLCanvasElement>) => {
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

  viewport.interactive = false;

  const viewportLayer = new Layer(new Group(2, true));
  viewportLayer.addChild(viewport);
  app.stage.addChild(viewportLayer);

  viewport.fit();
  viewport.moveCenter(viewport.worldWidth / 2, viewport.worldHeight / 2);
  return viewport;
};
