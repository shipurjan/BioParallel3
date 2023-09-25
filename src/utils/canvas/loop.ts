import * as PIXI from 'pixi.js';

const Graphics = PIXI.Graphics;
const loop = (app: PIXI.Application<HTMLCanvasElement>, delta: number) => {
  void delta;
  const rectangle = new Graphics();
  rectangle
    .beginFill(0xaa33bb)
    .lineStyle(4, 0xffea00, 1)
    .drawRect(
      Math.random() * app.screen.width,
      Math.random() * app.screen.height,
      10,
      10
    )
    .endFill();

  app.stage.addChild(rectangle);
};

export { loop };
