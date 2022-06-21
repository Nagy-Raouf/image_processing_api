import { Router, Request, Response } from 'express';
import File from '../../utils/file-handler';
import path from 'path';
import processImage from '../../utils/image-processing';
import { fullImagePath, cachedImagePath } from '../../constants';

// create image route
const image: Router = Router();

// validate request param
const validateInput = async (
  imageName: string,
  width: number,
  height: number,
  imagePath: string
): Promise<null | string> => {
  // check image name
  if (!imageName) {
    return 'Please provide the name of the image to be displayed';
  }

  // check requested image existence on the server
  if (!(await File.isImageFound(imagePath))) {
    return 'No image found with that name';
  }

  // check missing width or height in the param
  if ((!width && height) || (width && !height)) {
    return 'Please provide both param';
  }

  // check width and height are -ve values
  if (width < 0 || height < 0) {
    return 'Please provide valid param';
  }
  return null;
};

// image GET request handling
image.get('/', async (req: Request, res: Response): Promise<void> => {
  // request param
  const imageName = req.query.imagename as unknown as string;
  const width = parseInt((req.query.width as unknown as string) || '');
  const height = parseInt((req.query.height as unknown as string) || '');

  // file paths
  const fullFilePath: string = path.resolve(fullImagePath, `${imageName}.jpg`);
  const cacheFilePath: string = path.resolve(
    cachedImagePath,
    `${imageName}-${width}x${height}.jpg`
  );

  // validate param
  let error: null | string = await validateInput(
    imageName,
    width,
    height,
    fullFilePath
  );

  // invalid param handling
  if (error) {
    res.status(404).send(error);
    return;
  }

  // requesting image without re-shaping
  if (!(width || height)) {
    res.sendFile(fullFilePath);
    return;
  }

  // re-shape image using sharp
  if (width && height) {
    // check if cache is found on the server
    if (!(await File.isImageFound(cacheFilePath))) {
      error = await processImage(width, height, fullFilePath, cacheFilePath);

      // check image is re-shaped successfully
      if (error) {
        res.status(404).send(error);
        return;
      }
    }

    // send image after re-shaped
    res.sendFile(cacheFilePath);
  }
});

export default image;
