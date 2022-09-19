import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

// test the first endpoint "/"
describe("Test the home route '/'", () => {
  it('Just call the home endpoint to test it work when user enter URL "/" ', async () => {
    await request.get('/').expect(200);
  });
});
// test the second endpoint "/resize"
describe("Test the route without sending any parameters '/resize'", () => {
  it('Call the /resize without filename', async () => {
    await request.get('/resize').expect(400);
  });
});
describe("Test the route with parameters '/resize'", () => {
  it('Call the /resize with non-exist photo name (wrong parameters)', async () => {
    await request
      .get('/resize?filename=ahmed&width=100&hieght=100')
      .expect(400);
  });
  it('Call the /resize with exist photo on the output folder', async () => {
    await request
      .get('/resize?filename=icelandwaterfall&width=100&hieght=100')
      .expect(200);
  });
  it('Call the /resize with exist photo on the image folder', async () => {
    await request
      .get('/resize?filename=encenadaport&width=500&hieght=500')
      .expect(200);
  });
});
