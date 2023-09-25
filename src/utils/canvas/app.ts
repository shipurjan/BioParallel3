import * as PIXI from 'pixi.js';
import { loop } from './loop';

const CanvasApplication = (container: HTMLElement) => {
  const app = new PIXI.Application<HTMLCanvasElement>({
    background: '#1099bb',
    resizeTo: container,
  });
  app.ticker.add((delta) => loop(app, delta));
  return app;
};

export { CanvasApplication };
