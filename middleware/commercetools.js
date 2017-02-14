const createClient = require('@commercetools/sdk-client').createClient;
const createHttpMiddleware = require('@commercetools/sdk-middleware-http').createHttpMiddleware;
const createAuthMiddlewareForClientCredentialsFlow = require('@commercetools/sdk-middleware-auth').createAuthMiddlewareForClientCredentialsFlow
const createLoggerMiddleware = require('@commercetools/sdk-middleware-logger').createLoggerMiddleware;
const createRequestBuilder = require('@commercetools/api-request-builder').createRequestBuilder;
const features = require('@commercetools/api-request-builder').features;


const requestBuilder = createRequestBuilder()
const projectKey = process.env.PROJECT_KEY;
const clientId = process.env.PUBLIC_CLIENT_ID;
const clientSecret = process.env.PUBLIC_CLIENT_SECRET;
const authHost = process.env.AUTH_HOST;
const apiHost = process.env.API_HOST;
const scopes = process.env.PUBLIC_SCOPES.split(" ");

// set up CT client
const client = createClient({
  middlewares: [
    createAuthMiddlewareForClientCredentialsFlow({
      host: authHost,
      projectKey: projectKey,
      credentials: {
        clientId: clientId,
        clientSecret: clientSecret
      },
      scopes: scopes
    }),
    createLoggerMiddleware(),
    createHttpMiddleware({
      host: apiHost
    }),
    createLoggerMiddleware()
  ]
})

module.exports = client;
