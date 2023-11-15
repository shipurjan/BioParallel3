import { Group, Layer } from '@pixi/layers';
import { Viewport } from 'pixi-viewport';
import type * as PIXI from 'pixi.js';

export const createMarkersCanvasViewport = (
  app: PIXI.Application<HTMLCanvasElement>
) => {
  const markersViewport = new Viewport({
    screenWidth: app.view.clientWidth,
    screenHeight: app.view.clientHeight,
    worldWidth: app.view.clientWidth,
    worldHeight: app.view.clientHeight,
    threshold: 2,
    passiveWheel: false,
    ticker: app.ticker,
    events: app.renderer.events,
  });

  markersViewport.eventMode = 'none';

  const viewportLayer = new Layer(new Group(2, true)); // zIndex = 2
  viewportLayer.addChild(markersViewport);
  app.stage.addChild(viewportLayer);

  markersViewport.fit();
  markersViewport.moveCenter(
    markersViewport.worldWidth / 2,
    markersViewport.worldHeight / 2
  );

  return markersViewport;
};
