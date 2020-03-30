import { Service } from 'typedi';
import { Router } from 'express';
import { IRoute } from '../../../interfaces/IRoute';

@Service()
class BaseRouter {
  /**
   *
   * getter function intended to be overloaded by child classes returning middleware definitions in the
   * format:
   *
   * get middlewares(){
   *      return [
   *          ['GET', '/*', 'authenticationMiddleware']
   *      ]
   * }
   *
   * let ['HTTP_VERB', 'PATH', 'INSTANCE_METHOD'] = this.middlewares[0]
   *
   * @returns {Array}
   */
  get middlewares(): Array<any> {
    return [];
  }

  /**
   * getter function intended to be overloaded by child classes returning route definitions in the
   * format:
   *
   * get routes(){
   *      return [
   *          ['GET', '/ping', 'pingHandler'],
   *          ['POST', '/create', 'createHandler']
   *      ]
   * }
   *
   * let ['HTTTP_VERB', 'PATH', 'INSTANCE_METHOD'] = this.routes[0]
   *
   * @returns {Array}
   */
  get routes(): Array<IRoute> {
    return [];
  }

  /**
   * Initialize a new 'ClassBasedRouter' with instance.router being an express.Router object
   * with the given options.
   *
   */
  constructor(public router: Router) {
    this.router = Router();

    // middleware should be registered before routes as they are executed in order of declaration
    // similarly you should make sure things like bodyParser are configured before your router(s)
    this.register(this.middlewares);
    this.register(this.routes);
  }

  /**
   * Register an array of route/middleware definitions.
   *
   * @param handlers [[HTTP_VERB, PATH, INSTANCE_METHOD_NAME], ...]
   */
  register(routes: IRoute[]) {
    for (let { httpVerb, path, handlers } of routes) {
      // express.Router uses the lower-cased HTTP verb, might as well allow the semantic GET etc.
      httpVerb = httpVerb.toLowerCase();

      // register child instance methods as route handlers based on middleware definitions overloaded in get middlewares()
      this.router[httpVerb](path, ...handlers);
    }
  }
}

export default BaseRouter;
