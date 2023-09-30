import * as PIXI from 'pixi.js';

export const CanvasApplication = (container: HTMLElement) => {
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
