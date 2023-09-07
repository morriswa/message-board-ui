// @ts-ignore
import package_settings from 'package.json';

export const environment = {
  production: false,
  api : "https://qa.api.messageboard.morriswa.org/",
  securepath : 'v0/',
  auth : {
    "domain" : "dev-9deub659.us.auth0.com",
    "clientId" : "FiugLBKKkUvCHYDSaJkztCMxkldOEMpv",
    "audience" : "api://message-board-service",
    "scopes": "openid email profile org.morriswa.messageboard:develop"
  },
  app_version: package_settings.version,
};
