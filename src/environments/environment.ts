// @ts-ignore
import package_settings from 'package.json';

export const environment = {
  production: false,
  api : {
    scheme: 'http',
    path: '127.0.0.1:8081',
    routes: {
      secured: 'secured',
      develop: 'developer'
    }
  },
  auth : {
    "domain" : "dev-9deub659.us.auth0.com",
    "clientId" : "Wi9msBPJr0pr56mPWJy4FuSWwQKFVmAA",
    "audience" : "http://127.0.0.1:8081/v0",
    "scopes": "openid email profile"
  },
  app_version: package_settings.version,
};
