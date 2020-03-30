import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import config from '../config';
import User from '../models/User';

export default async (): Promise<any> => {
  const sequelizeOptions: SequelizeOptions = {
    dialect: 'postgres',
    host: config.databaseUrl,
    models: [User]
  };
  const sequelize = new Sequelize(
    config.databaseName,
    config.databaseUsername,
    config.databasePassword,
    sequelizeOptions
  );
  return sequelize.sync();
};
