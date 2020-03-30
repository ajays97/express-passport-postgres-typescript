import { Router } from 'express';

import { ME } from '../constants';
import { Service } from 'typedi';
import BaseRouter from '../base.router';
import { IRoute } from '../../../interfaces/IRoute';
import { HttpVerb } from '../../../utils/constants';
import { isAuthenticated, isAuthenticatedForRoles } from '../../middlewares/auth.middleware';
import { Roles } from '../../../utils';

@Service()
class UserRouter extends BaseRouter {
  constructor(router: Router) {
    super(router);
  }

  get routes() {
    let routes: Array<IRoute> = [];

    routes.push({
      httpVerb: HttpVerb.POST,
      path: ME,
      handlers: [isAuthenticated, isAuthenticatedForRoles([Roles.ADMIN]), this.me]
    });

    return routes;
  }

  me(req, res, next) {
    res.json({ message: 'you are authorized' }).status(200);
  }
}

export default UserRouter;
