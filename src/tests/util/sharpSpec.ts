import resizeImage from '../../util/sharp';
import path from 'path';
// test the first endpoint "/"
describe('Test resizeImage function', () => {
  const ImagePath = path.resolve('./images') as string;
  const OutputPath = (path.resolve('./') + '/output/') as string;
  it('Send exist parameters to resizeImage function', async () => {
    const result = await resizeImage(
      ImagePath + '/' + 'encenadaport.jpg',
      100,
      200,
      OutputPath + '/' + 'encenadaport'
    );
    expect(result).toBeTrue();
  });
});
