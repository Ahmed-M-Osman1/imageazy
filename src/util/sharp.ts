import sharp from 'sharp';
const resizeImage = (
  inputFile: string,
  hieght: number,
  width: number,
  outputFile: string
) => {
  return sharp(inputFile)
    .resize(width, hieght)
    .toFile(outputFile + '_' + hieght + '_' + width + '.jpg');
};

export default resizeImage;
