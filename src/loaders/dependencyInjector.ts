import { Container } from 'typedi';

import LoggerInstance from './logger';
import { ContainerDependencies } from '../utils/constants';

export default () => {
  try {
    Container.set(ContainerDependencies.LOGGER, LoggerInstance);

    // Set a container for email service
    // Container.set('emailClient', mail({ apiKey: config.emails.apiKey, domain: config.emails.domain }));

    LoggerInstance.info('Logger instance creator and container set!');

    return { logger: LoggerInstance };
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
