import { readFile } from '@utils/filesystem/readFile';
import * as PIXI from 'pixi.js';

export async function loadSprite(
  path: string
): Promise<PIXI.Sprite | undefined>;
export async function loadSprite(
  imageBytes: Uint8Array
): Promise<PIXI.Sprite | undefined>;
export async function loadSprite(
  data: unknown
): Promise<PIXI.Sprite | undefined> {
  try {
    const imageBytes = await (async () => {
      if (typeof data === 'string') return readFile(data);
      if (data instanceof Uint8Array) return data;
    })();
    if (!imageBytes)
      throw new Error('Failed to receive a byte representation of a file');

    const bitmap = await createImageBitmap(new Blob([imageBytes]));
    const sprite = new PIXI.Sprite(PIXI.Texture.from(bitmap));
    return sprite;
  } catch (error) {
    console.error(error);
  }
}
