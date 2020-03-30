import { Router } from 'express';
import Container from 'typedi';

import { AUTH_ROUTE, USERS_ROUTE } from './routers/constants';
import { AuthRouter, UserRouter } from './routers';

const routes = () => {
  const appRouter: Router = Router();
  appRouter.use(AUTH_ROUTE, Container.get(AuthRouter).router);
  appRouter.use(USERS_ROUTE, Container.get(UserRouter).router);
  return appRouter;
};

export default routes;
