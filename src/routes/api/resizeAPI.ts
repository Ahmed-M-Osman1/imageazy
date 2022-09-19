import { Router, Request, Response } from 'express';
import path from 'path';
import findPhoto from './findPhoto';
import resizeImage from '../../util/sharp';
const resizeAPI = Router();

resizeAPI.get('/', (req: Request, res: Response) => {
  // get the name of the file.
  const name = req.query.filename as string;
  const width = Number(req.query.width);
  const hieght = Number(req.query.hieght);
  // get all file names on the images folder.
  const ImagePath = path.resolve('./images') as string;
  const OutputPath = (path.resolve('./') + '/out/') as string;
  const x = findPhoto(OutputPath, name);
  console.log(x);
  // use fs readdir function to read the folder:
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
});
export default resizeAPI;
