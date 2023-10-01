import * as PIXI from 'pixi.js';

export const CanvasApplication = (container: HTMLElement) => {
  PIXI.BaseTexture.defaultOptions.scaleMode = 0;
  const app = new PIXI.Application<HTMLCanvasElement>({
    background: '#1099bb',
    resizeTo: container,
    antialias: true,
    autoDensity: true,
    autoStart: true,
    powerPreference: 'high-performance',
    resolution: 1,
  });

  container.appendChild(app.view);
  return app;
};
