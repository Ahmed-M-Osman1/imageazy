import sharp from 'sharp';
const resizeImage = (
  inputFile: string,
  hieght: number,
  width: number,
  outputFile: string
) => {
  return sharp(inputFile)
    .resize(hieght, width)
    .toFile(outputFile + '.jpg');
};

export default resizeImage;
