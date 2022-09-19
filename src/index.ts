import express from 'express';
import routes from './routes';

const app = express();
const localport: number = 3002;

app.use(routes);

app.listen(localport, () => {
  console.log('App is working on port: ' + localport);
});

export default app;
