import fs from 'fs';
const findPhoto = (path: string, name: string): boolean => {
  const filesOnInputFolder: Array<string> = [];
  fs.readdirSync(path).forEach((file) => {
    // edit the file name. TO remove the extention. using regix
    const fileName: string = file.replace(/\.[^/.]+$/, '');
    filesOnInputFolder.push(fileName);
  });
  return filesOnInputFolder.includes(name) ? true : false;
};
export default findPhoto;
