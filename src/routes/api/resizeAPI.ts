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
  const isPhotoCashed = existsSync(
    OutputPath + '/' + name + '_' + hieght + '_' + width + '.jpg'
  );
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
    res.sendFile(OutputPath + '/' + name + '_' + hieght + '_' + width + '.jpg');
  };
  if (isPhotoCashed) {
    return res.sendFile(
      OutputPath + '/' + name + '_' + hieght + '_' + width + '.jpg'
    );
  } else if (isPhotoExist) {
    return photoFound();
  } else {
    return res
      .status(400)
      .send('Bad request, query parameter (name) is required.');
  }
});
export default resizeAPI;
