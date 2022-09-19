import { Router, Request, Response } from 'express';
import path from 'path';
import findPhoto from './findPhoto';
import { existsSync } from 'fs';
import resizeImage from '../../util/sharp';

const resizeAPI = Router();

resizeAPI.get('/', (req: Request, res: Response) => {
  // get the name of the file, width and hieght.
  const name = req.query.filename as string;
  const width = Number(req.query.width);
  const hieght = Number(req.query.hieght);
  // get both folder (input and output) path.
  const ImagePath = path.resolve('./images') as string;
  const OutputPath = (path.resolve('./') + '/output/') as string;
  // know the cached Photo path (to check of it's exists)
  const cachedPhotoName: string =
    OutputPath + '/' + name + '_' + hieght + '_' + width + '.jpg';

  // return the photo (I make it as function so I can reuse it)
  const cropPhoto = async (
    ImagePath: string,
    name: string,
    hieght: number,
    width: number,
    OutputPath: string
  ) => {
    await resizeImage(
      ImagePath + '/' + name + '.jpg',
      hieght,
      width,
      OutputPath + '/' + name
    );
    return res.status(200).sendFile(cachedPhotoName);
  };

  // check if the photo is cashed or the photo is exit in the image folder.
  const isPhotoCashed = existsSync(cachedPhotoName);
  const isPhotoExist = findPhoto(ImagePath, name);
  if (name === undefined || isNaN(width) || isNaN(hieght)) {
    return res
      .status(400)
      .send(
        "Bad Request. Ether File name, Width or Hieght is missing. please use: resize?filename='File Name'&width=' Number'&hieght=' Number' in your URL"
      );
  } else if (isPhotoCashed) {
    return res.status(200).sendFile(cachedPhotoName);
  } else if (isPhotoExist) {
    return cropPhoto(ImagePath, name, hieght, width, OutputPath);
  } else {
    return res
      .status(400)
      .send('The file you Request is not available please choose anthor file.');
  }
});
export default resizeAPI;
