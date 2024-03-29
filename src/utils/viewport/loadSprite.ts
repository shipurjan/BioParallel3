import { readFile } from '@utils/filesystem/readFile';
import * as PIXI from 'pixi.js';

export async function loadSprite(data: string | Uint8Array) {
  try {
    const imageBytes = await (async () => {
      if (typeof data === 'string') return readFile(data);
      if (data instanceof Uint8Array) return data;

      throw new Error(
        `Sprite could not be loaded because the received data is of unknown type: ${JSON.stringify(
          data
        )}`
      );
    })();

    if (!imageBytes)
      throw new Error('Failed to receive a byte representation of a file');

    const bitmap = await createImageBitmap(new Blob([imageBytes]));
    const sprite = new PIXI.Sprite(PIXI.Texture.from(bitmap));
    return sprite;
  } catch (error) {
    console.error(error);
  }

  throw new Error(
    `Something went wrong with loading the sprite: ${JSON.stringify(data)}`
  );
}
