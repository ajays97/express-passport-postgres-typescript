import Container from 'typedi';
import { Request, Response } from 'express';
import { AuthService } from '../../../services';
import { ContainerDependencies } from '../../../utils/constants';
import { UserDTO } from '../../../models/User';
import { Logger } from 'winston';

export const register = async (request: Request, response: Response) => {
  const logger: Logger = Container.get(ContainerDependencies.LOGGER);
  logger.debug('Signing up new user: %o', request.body);
  const { username, email, phone, password, firstName, lastName } = request.body;
  const user: UserDTO = { username, email, phone, password, firstName, lastName };

  try {
    const authService: AuthService = Container.get(AuthService);
    const signUpData = await authService.signUp(user);
    response.json(signUpData).status(200);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const login = async (request: Request, response: Response) => {
  const logger: Logger = Container.get(ContainerDependencies.LOGGER);
  logger.debug('Signing in user: %o', request.body);

  try {
    const { email, password } = request.body;
    const authService: AuthService = Container.get(AuthService);
    const token = await authService.signIn(email, password);
    return response.json({ token }).status(200);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};
