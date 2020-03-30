import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
}

export default {
  /**
   * Database url
   */
  databaseUrl: process.env.DATABASE_URL,

  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * Postgresql Database URI
   */
  databaseName: process.env.DATABASE_NAME,

  /**
   * Database username
   */
  databaseUsername: process.env.DATABASE_USER,

  /**
   * Database password
   */
  databasePassword: process.env.DATABASE_PWD,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api'
  }
};
