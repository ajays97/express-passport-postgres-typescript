import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';

import events from './events.subscriber';
import { IUser } from '../models/User';

@EventSubscriber()
export default class UserSubscriber {
  /**
   * User Events
   */
  @On(events.user.signIn)
  public onUserSignIn({ _id }: Partial<IUser>) {
    const Logger: any = Container.get('logger');

    try {
      // Do some operations everytime someone logs in
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signIn}: %o`, e);

      // Throw the error so the process die (check src/app.ts)
      throw e;
    }
  }
  @On(events.user.signUp)
  public onUserSignUp({ username, email, _id }: Partial<IUser>) {
    const Logger: any = Container.get('logger');

    try {
      // Do some operations everytime someone signs up for the platform.
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signUp}: %o`, e);

      // Throw the error so the process dies (check src/app.ts)
      throw e;
    }
  }
}
