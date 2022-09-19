import fs from 'fs';
const findPhoto = (path: string, name: string): boolean => {
  const filesOnInputFolder: Array<string> = [];
  fs.readdirSync(path).forEach((file) => {
    // edit the file name. TO remove the extention. using regix
    const fileName = file.replace(/\.[^/.]+$/, '');
    filesOnInputFolder.push(fileName);
    console.log(filesOnInputFolder);
  });
  return filesOnInputFolder.includes(name) ? true : false;
};
export default findPhoto;
