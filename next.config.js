// @ts-check

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  return {
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
      // Should be disabled for production
      guestUser: true,
      apidoc: true,
      rails: {
        url: process.env.RAILS_URL,
        clientId: process.env.RAILS_CLIENT_ID,
        clientSecret: process.env.RAILS_CLIENT_SECRET,
      }
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      amplitude: {
        apiKey: process.env.AMPLITUDE_API_KEY
      },
      gameSkip: true,
      debugBar: true,
      withoutInteractiveCanvas: true,
      interactiveCanvasLibUrl: 'https://www.gstatic.com/assistant/interactivecanvas/api/interactive_canvas_eap.min.js',
      rollbar: {
        clientToken: null, //'d858493f24794689b215a6b72b4324eb',
        serverToken: 'd858493f24794689b215a6b72b4324eb',
        enviroment: 'dev'
      }
    }
  }
}
