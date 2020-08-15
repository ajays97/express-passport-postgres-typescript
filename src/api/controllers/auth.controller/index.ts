import { Service, Inject } from 'typedi';
import { Request, Response } from 'express';
import { AuthService } from '../../../services';
import { ContainerDependencies } from '../../../utils/constants';
import { UserDTO } from '../../../models/User';
import { Logger } from 'winston';
import BaseController from '../base.controller';

@Service('AuthController')
class AuthController {
  constructor(
    @Inject(ContainerDependencies.LOGGER) private logger: Logger,
    @Inject('AuthService') private authService: AuthService,
    @Inject('BaseController') private response: BaseController
  ) {}

  public register = async (request: Request, response: Response) => {
    this.logger.debug('Signing up new user: %o', request.body);
    const { username, email, phone, password, firstName, lastName } = request.body;
    const user: UserDTO = { username, email, phone, password, firstName, lastName };

    try {
      const signUpData = await this.authService.signUp(user);
      if (signUpData.isFailure) this.response.clientError(response, signUpData.error.message);
      else this.response.ok(response, signUpData.getValue());
    } catch (error) {
      this.response.fail(response, error.message);
    }
  };

  public login = async (request: Request, response: Response) => {
    this.logger.debug('Signing in user: %o', request.body);

    try {
      const { email, password } = request.body;
      const tokenData = await this.authService.signIn(email, password);
      if (tokenData.isFailure) this.response.clientError(response, tokenData.error.message);
      else this.response.ok(response, tokenData.getValue());
    } catch (error) {
      this.response.fail(response, error.message);
    }
  };
}

export default AuthController;
