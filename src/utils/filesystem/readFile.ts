import { invoke } from '@tauri-apps/api';

export const readFile = async (path: string) => {
  try {
    const response = await invoke<number[]>('read_file', { path });
    return new Uint8Array(response);
  } catch (error) {
    console.error(error);
  }

  throw new Error(
    `Something went wrong with reading the file at path: ${path}`
  );
};
