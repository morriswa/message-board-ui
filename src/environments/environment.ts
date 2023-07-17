// @ts-ignore
import package_settings from 'package.json';

export const environment = {
  production: false,
  api : "http://127.0.0.1:8081/",
  userProfileService: "http://127.0.0.1:8081/v0/",
  communityService: "http://127.0.0.1:8082/v0/",
  contentService: "http://127.0.0.1:8083/v0/",
  securepath : 'v0/',
  auth : {
    "domain" : "dev-9deub659.us.auth0.com",
    "clientId" : "Wi9msBPJr0pr56mPWJy4FuSWwQKFVmAA",
    "audience" : "http://127.0.0.1:8081/v0",
  },
  app_version: package_settings.version,
};
