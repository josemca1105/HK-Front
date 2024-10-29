import { EnvironmentPlugin } from 'webpack';
const Dotenv = require('dotenv-webpack');

const plugins = [
  process.env['NODE_ENV'] !== 'production' && new Dotenv({ path: './.env' }),
  new EnvironmentPlugin(
    process.env['NODE_ENV'] === 'production'
      ? {
          API_URL: '',
          FIREBASE_API_KEY: '',
          FIREBASE_APP_ID: '',
          FIREBASE_AUTH_DOMAIN: '',
          FIREBASE_MESSAGING_SENDER_ID: '',
          FIREBASE_PROJECT_ID: '',
          FIREBASE_STORAGE_BUCKET: '',
        }
      : {}
  ),
].filter(Boolean);

module.exports = {
  plugins,
};
