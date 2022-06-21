import sharp from 'sharp';

// re-size image using sharp
const processImage = async (
  width: number,
  height: number,
  source: string,
  target: string
): Promise<null | string> => {
  try {
    // try re-sizing the image
    await sharp(source).resize(width, height).toFormat('jpeg').toFile(target);
    return null;
  } catch {
    // failure message
    return `Image Processing failed`;
  }
};

export default processImage;
