import { Router, Request, Response } from 'express';
import image from './api/image';

// create routes
const routes: Router = Router();

// add routing for /api/image path
routes.use('/api/image', image);

// add routing for / path
routes.get('/', (req: Request, res: Response) => {
  res.send(
    `<h1>Welcome to image processing api</h1><p>Please follow the description on the readme file to get started</p>`
  );
});

// add routing for not found path
routes.use((req: Request, res: Response) => {
  res.status(404).send(`<h1>Page is not found</h1>`);
});

export default routes;
