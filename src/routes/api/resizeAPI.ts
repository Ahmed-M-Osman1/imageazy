import { Router, Request, Response } from 'express';
import path from 'path';
import findPhoto from './findPhoto';
import resizeImage from '../../util/sharp';
import { existsSync } from 'fs';

const resizeAPI = Router();

resizeAPI.get('/', (req: Request, res: Response) => {
  // get the name of the file.
  const name = req.query.filename as string;
  const width = Number(req.query.width);
  const hieght = Number(req.query.hieght);
  // get all file names on the images folder.
  const ImagePath = path.resolve('./images') as string;
  const OutputPath = (path.resolve('./') + '/out/') as string;
  const cachedPhotoName =
    OutputPath + '/' + name + '_' + hieght + '_' + width + '.jpg';

  const isPhotoCashed = existsSync(cachedPhotoName);
  console.log(isPhotoCashed);

  const isPhotoExist = findPhoto(ImagePath, name);
  // use fs readdir function to read the folder:
  console.log('=>', isPhotoExist);
  const photoFound = async () => {
    console.log('start photo fun');
    await resizeImage(
      ImagePath + '/' + name + '.jpg',
      hieght,
      width,
      OutputPath + '/' + name
    );
    returnThePhoto();
  };
  const returnThePhoto = () => {
    res.sendFile(cachedPhotoName);
  };
  if (isPhotoCashed) {
    return res.sendFile(cachedPhotoName);
  } else if (isPhotoExist) {
    return photoFound();
  } else if (width === undefined || hieght === undefined) {
    return res
      .status(400)
      .send(
        "Bad Request. Ether Width or Hieght is missing. please use: filename='File Name'&width=' Number'&hieght=' Number'"
      );
  } else {
    return res
      .status(400)
      .send('Bad request, query parameter (name) is required.');
  }
});
export default resizeAPI;
