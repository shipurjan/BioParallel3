export const getDroppedFileData = async (
  event: DragEvent & {
    currentTarget: EventTarget & HTMLDivElement;
  }
) => {
  event.preventDefault();
  try {
    if (!event.dataTransfer) throw new Error('Received unexpected event data');
    const items = event.dataTransfer.items;
    if (items) {
      for (const item of items) {
        if(item.kind === 'string'){
          item.getAsString((s) => {
            console.log("file string: ",s)
          });
        }
        if (item.kind !== 'file')
          throw new Error(`Received object is not a file but ${item.kind}`);
        if (!item.type.startsWith('image/'))
          throw new Error('Received file is not an image');

        console.log(item)
        const file = item.getAsFile();
        if (!file) throw new Error('This object is not a file');

        return file.arrayBuffer().then((e) => new Uint8Array(e));
      }
    } else {
      const files = event.dataTransfer.files;
      for (const file of files) {
        return file.arrayBuffer().then((e) => new Uint8Array(e));
      }
    }
  } catch (error) {
    console.error(error);
  }
};
