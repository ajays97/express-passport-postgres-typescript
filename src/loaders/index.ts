import dependencyInjectorLoader from './dependencyInjector';
// We have to import at least all the events once so they can be triggered
import './events';
import expressLoader from './express';
import Logger from './logger';
import sequelizeLoader from './sequelize';

export default async ({ expressApp }) => {
  // Write your DB connection stuff here
  const sequelizeConnection = await sequelizeLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */
  const { logger } = await dependencyInjectorLoader();
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
