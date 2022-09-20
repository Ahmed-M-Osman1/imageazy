import sharp from 'sharp';
const resizeImage = async (
  inputFile: string,
  hieght: number,
  width: number,
  outputFile: string
) => {
  try {
    sharp(inputFile)
      .resize(width, hieght)
      .toFile(outputFile + '_' + hieght + '_' + width + '.jpg');
    return true;
  } catch (err) {
    return false;
  }
};
export default resizeImage;
