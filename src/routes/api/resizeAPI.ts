import { Router, Request, Response } from 'express';
import path from 'path';
import fs, { existsSync } from 'fs';
import resizeImage from '../../util/sharp';
const resizeAPI = Router();

resizeAPI.get('/', (req: Request, res: Response) => {
  // get the name of the file.
  const name = req.query.filename as string;
  const width = Number(req.query.width);
  const hieght = Number(req.query.hieght);
  console.log('check : ', name);
  console.log('check : ', hieght);
  console.log('check : ', typeof width); // get all file names on the images folder.
  const ImagePath = path.resolve('./images');
  const OutputPath = path.resolve('./') + '/out/';
  const filesOnInputFolder: Array<string> = [];
  // use fs readdir function to read the folder:
  fs.readdir(ImagePath, (err, files) => {
    if (err) {
      throw err;
    }
    // get all files name:
    files.forEach(async (file) => {
      // parse the file name. TO remove the extention.
      const fileName = path.parse(file);
      await filesOnInputFolder.push(fileName.name);
    });
  });
  const isFileExist = filesOnInputFolder.includes(name);
  console.log(isFileExist);
  if (isFileExist) {
    return await resizeImage(
      ImagePath + '/' + name + '.jpg',
      hieght,
      width,
      OutputPath + '/' + name
    );
  } else {
    return console.log('not exist');
  }
});
export default resizeAPI;
