import { Router, Request, Response } from 'express';
import path from 'path';
import fs, { existsSync } from 'fs';

const resizeAPI = Router();

resizeAPI.get('/', (req: Request, res: Response) => {
  // get the name of the file.
  const name = req.query.filename as string;
  console.log('check : ', name);
  // get all file names on the images folder.
  const pathName = path.resolve('./images');
  console.log(pathName);
  // use fs readdir function to read the folder:
  fs.readdir(pathName, (err, files) => {
    if (err) {
      throw err;
    }

    // get all files name:
    files.forEach((file) => {
      // parse the file name. TO remove the extention.
      const fileName = path.parse(file);
      console.log(fileName.name);
    });
  });
});
export default resizeAPI;
