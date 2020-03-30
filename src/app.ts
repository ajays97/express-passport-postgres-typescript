import express from 'express';
import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * So we are using good old require.
   **/
  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, (err: Error) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`
      ################################################
      #   Magic happens on port: ${config.port}      #
      ################################################
    `);
  });
}

startServer();
