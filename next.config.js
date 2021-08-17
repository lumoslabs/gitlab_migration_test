// @ts-check
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = (phase) => {
  return {
    target: process.env.SERVERLESS ? 'serverless' : 'server',
    webpack: (config) => {
      config.module.rules.push({
        resourceQuery: /raw/,
        type: 'asset/source',
      })
      return config
    },
    async rewrites() {
      return [
        {
          source: '/home',
          destination: `/`,
        },
        {
          source: '/game/:game*',
          destination: `/`,
        },
        {
          source: '/training',
          destination: `/`,
        },
        {
          source: '/account-linking',
          destination: `/`,
        },
      ]
    },
    serverRuntimeConfig: {
      // Will only be available on the server side
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID
      },
      publicUrl: process.env.PUBLIC_URL,
      dynamodb: {
        prefix: process.env.DYNAMODB_PREFIX,
        region: process.env.DYNAMODB_REGION,
        endpoint: process.env.DYNAMODB_LOCAL ? 'http://localhost:' + process.env.DYNAMODB_PORT : undefined,
        sslEnabled: process.env.DYNAMODB_SSL ? true : false,
      },
      jwt: {
        secret: 'devjwtsecret' || process.env.JWT_SECRET,
        expiresIn: '24h'
      },
      misc: {
        configCatalogId: 1
      },
      guestUser: true,
      // Should be disabled for production
      apidoc: (phase === PHASE_DEVELOPMENT_SERVER),
      rails: {
        url: process.env.RAILS_URL,
        clientId: process.env.RAILS_CLIENT_ID,
        clientSecret: process.env.RAILS_CLIENT_SECRET,
        encryptionToken: process.env.RAILS_ENCRYPTION_SECRET || 'Secret Passphrase',
      },
      rollbar: {
        serverToken: process.env.ROLLBAR_SERVER_TOKEN,
        enviroment: process.env.ROLLBAR_ENV
      },
      underageBanSeconds: 172800, //48h
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      amplitude: {
        apiKey: process.env.AMPLITUDE_API_KEY
      },
      gameSkip: (phase === PHASE_DEVELOPMENT_SERVER),
      debugBar: (phase === PHASE_DEVELOPMENT_SERVER),
      interactiveCanvasLibUrl: 'https://www.gstatic.com/assistant/interactivecanvas/api/interactive_canvas_eap.min.js',
      rollbar: {
        clientToken: process.env.ROLLBAR_CLIENT_TOKEN,
        enviroment: process.env.ROLLBAR_ENV
      }
    }
  }
}
