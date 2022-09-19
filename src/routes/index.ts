import { Router, Request, Response } from 'express';
import resizeAPI from './api/resizeAPI';
const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      'Welcome to ImagEasy: An Image processer API that will resize your Image. simply add the fileName, hieght and width '
    );
});

routes.use('/resize', resizeAPI);
export default routes;
