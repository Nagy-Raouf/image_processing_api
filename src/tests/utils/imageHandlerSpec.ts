import processImage from '../../utils/image-processing';
import { fullImagePath, cachedImagePath } from '../../constants';
import path from 'path';

describe('Image Processing Test', (): void => {
  it('Process image using -ve value for width', async (): Promise<void> => {
    //Arrange
    const imageName = `fjord`;
    const width = 500;
    const height = -500;
    const fullFilePath = path.resolve(fullImagePath, `${imageName}.jpg`);
    const cacheFilePath = path.resolve(
      cachedImagePath,
      `${imageName}-${width}x${height}.jpg`
    );

    //Act
    const result = await processImage(
      width,
      height,
      fullFilePath,
      cacheFilePath
    );

    //Validate
    expect(result).toBe(`Image Processing failed`);
  });

  it('Process image using -ve value for height', async (): Promise<void> => {
    //Arrange
    const imageName = `fjord`;
    const width = 500;
    const height = -500;
    const fullFilePath = path.resolve(fullImagePath, `${imageName}.jpg`);
    const cacheFilePath = path.resolve(
      cachedImagePath,
      `${imageName}-${width}x${height}.jpg`
    );

    //Act
    const result = await processImage(
      width,
      height,
      fullFilePath,
      cacheFilePath
    );

    //Validate
    expect(result).toBe(`Image Processing failed`);
  });

  it('Process image using undefined image', async (): Promise<void> => {
    //Arrange
    const imageName = `test`;
    const width = 500;
    const height = 500;
    const fullFilePath = path.resolve(fullImagePath, `${imageName}.jpg`);
    const cacheFilePath = path.resolve(
      cachedImagePath,
      `${imageName}-${width}x${height}.jpg`
    );

    //Act
    const result = await processImage(
      width,
      height,
      fullFilePath,
      cacheFilePath
    );

    //Validate
    expect(result).toBe(`Image Processing failed`);
  });
});
