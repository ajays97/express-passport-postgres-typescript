import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import { Service, Inject } from 'typedi';

import config from '../../config';
import User, { IUser, UserDTO } from '../../models/User';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import { Roles } from '../../utils';
import { ContainerDependencies } from '../../utils/constants';
import { Result } from '../Result';
import { Logger } from 'winston';

@Service('AuthService')
class AuthService {
  constructor(@Inject(ContainerDependencies.LOGGER) private logger: Logger) {}

  public initialize = () => {
    passport.use('jwt', this.getStrategy());
    return passport.initialize();
  };

  public async signUp(
    user: UserDTO
  ): Promise<
    Result<{
      user: User;
      token: string;
    }>
  > {
    try {
      const salt = randomBytes(32);
      const { username, email, phone, password, firstName, lastName } = user;
      const hashedPassword = await argon2.hash(password, { salt });

      const newUser: IUser = {
        username,
        firstName,
        lastName,
        providers: '',
        email,
        phone,
        password: hashedPassword,
        roles: [Roles.USER, Roles.ADMIN]
      };

      const signedUpUser: User = await User.create(newUser);
      const token = this.generateToken(signedUpUser);
      if (!signedUpUser) {
        return Result.fail<{
          user: User;
          token: string;
        }>('Unable to create user');
      }

      Reflect.deleteProperty(signedUpUser, 'password');
      return Result.ok({ user: signedUpUser, token });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async signIn(email: string, password: string): Promise<Result<string>> {
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    const validPassword = await argon2.verify(user.password, password);
    if (validPassword) {
      const token = this.generateToken(user);
      return Result.ok(token);
    } else {
      return Result.fail<string>('Invalid Password');
    }
  }

  private getStrategy = (): Strategy => {
    const strategyOptions: StrategyOptions = {
      secretOrKey: config.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true
    };

    return new Strategy(strategyOptions, (request: any, payload: any, done) => {
      // Get the user from the db using payload.username or something
      const validUser = true;

      if (validUser) {
        return done(null, payload);
      } else {
        return done({ error: 'Error simple' });
      }
    });
  };

  private generateToken(user: any) {
    const today = new Date();
    const expiresAt = new Date(today);
    expiresAt.setDate(today.getDate() + 60);

    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id,
        roles: user.roles,
        username: user.username,
        email: user.email,
        expiresAt: expiresAt.getTime() / 1000
      },
      config.jwtSecret
    );
  }
}

export default AuthService;
