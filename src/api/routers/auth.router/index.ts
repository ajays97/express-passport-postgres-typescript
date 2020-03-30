import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Service } from 'typedi';

import { SIGNUP, SIGNIN } from '../constants';
import { AuthController } from '../../controllers';
import { HttpVerb } from '../../../utils/constants';
import BaseRouter from '../base.router';
import { IRoute } from '../../../interfaces/IRoute';

@Service()
class AuthRouter extends BaseRouter {
  constructor(router: Router) {
    super(router);
  }

  get routes() {
    let routes: Array<IRoute> = [];

    routes.push({
      httpVerb: HttpVerb.POST,
      path: SIGNUP,
      handlers: [
        celebrate({
          body: Joi.object({
            username: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            phone: Joi.string().required()
          })
        }),
        AuthController.register
      ]
    });

    routes.push({ httpVerb: HttpVerb.POST, path: SIGNIN, handlers: [AuthController.login] });
    return routes;
  }
}

export default AuthRouter;
