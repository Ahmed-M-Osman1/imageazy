import sharp from 'sharp';
const resizeImage = (
  inputFile: string,
  hieght: number,
  width: number,
  outputFile: string
) => {
  return sharp(inputFile)
    .resize(hieght, width)
    .toFile(outputFile + '_' + hieght + '_' + width + '.jpg');
};

export default resizeImage;
