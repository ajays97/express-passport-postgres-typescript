import { NextFunction, Response, Request } from 'express';
import passport from 'passport';
import { Container } from 'typedi';

import { AuthService } from '../../../services';

export const initialize = (_request: Request, _response: Response, next: NextFunction) => {
  const authService: AuthService = Container.get(AuthService);
  authService.initialize();
  return next();
};

export const authenticate = callback => {
  return passport.authenticate(
    'jwt',
    {
      session: false,
      failWithError: true
    },
    callback
  );
};

/**
 * Checks if the request has a valid JWT token
 * @param request
 * @param response
 * @param next
 */
export const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
  return authenticate((err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      if (info.name === 'TokenExpiredError') {
        return response.status(401).json({ message: 'Your token has expired. Please generate a new one' });
      } else {
        return response.status(401).json({ message: info.message });
      }
    }
    request.user = user;
    return next();
  })(request, response, next);
};

/**
 * Middleware for role-based authorization of routes
 * @param {*} roles
 */
export const isAuthenticatedForRoles = (roles: string[]) => (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorized = roles.some(role => request.user.roles.includes(role));

  if (!authorized) {
    return response.status(401).json({ message: "You don't have enough privileges to perform this operation." });
  }

  return next();
};
