import * as PIXI from 'pixi.js';

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const CanvasApplication = (container: HTMLElement) => {
  PIXI.BaseTexture.defaultOptions.scaleMode = 0;
  const primaryColorVariable = getComputedStyle(document.body)
    .getPropertyValue('--color-primary-400')
    .trim();
  const backgroundColor = (() => {
    if (/^\d{1,3} \d{1,3} \d{1,3}$/.test(primaryColorVariable)) {
      const primaryColorList = primaryColorVariable
        .split(' ')
        .map((e) => Number(e)) as [number, number, number];
      return rgbToHex(
        primaryColorList[0],
        primaryColorList[1],
        primaryColorList[2]
      );
    } else return '#ffffff';
  })();

  const app = new PIXI.Application<HTMLCanvasElement>({
    background: backgroundColor,
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
