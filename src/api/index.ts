import { Router } from 'express';

import { AUTH_ROUTE, USERS_ROUTE } from './routers/constants';
import { AuthRouter, UserRouter } from './routers';

const routes = () => {
  const appRouter: Router = Router();
  appRouter.use(AUTH_ROUTE, new AuthRouter(appRouter).router);
  appRouter.use(USERS_ROUTE, new UserRouter(appRouter).router);
  return appRouter;
};

export default routes;
