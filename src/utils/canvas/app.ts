import * as PIXI from 'pixi.js';

const CanvasApplication = (container: HTMLElement) => {
  const app = new PIXI.Application<HTMLCanvasElement>({
    background: '#1099bb',
    resizeTo: container,
  });
  return app;
};

export { CanvasApplication };
