import type { Viewport } from 'pixi-viewport';
import type * as PIXI from 'pixi.js';

export const addSprite = (viewport: Viewport, sprite: PIXI.Sprite) => {
  const scale =
    sprite.width > viewport.worldWidth || sprite.height > viewport.worldHeight
      ? viewport.findFit(sprite.width, sprite.height)
      : 1;
  sprite.width *= scale;
  sprite.height *= scale;
  sprite.position.set(
    (viewport.worldWidth - sprite.width) / 2,
    (viewport.worldHeight - sprite.height) / 2
  );
  viewport.addChild(sprite);
};
