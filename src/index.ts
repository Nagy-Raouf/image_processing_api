import express, { Application } from 'express';
import File from './utils/file-handler';
import { cachedImagePath } from './constants';
import routes from './routers/index';

const PORT = 3000;
// create server
const app: Application = express();

// add routes
app.use(routes);

// start server
app.listen(PORT, async (): Promise<void> => {
  console.log(`Server is listening to port:${PORT}`);

  // create thumb file to save cached images
  await File.createDirectory(cachedImagePath);
});

export default app;
