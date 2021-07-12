// @ts-check

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  return {
    serverRuntimeConfig: {
      // Will only be available on the server side
      google: {
        client_id: process.env.GOOGLE_CLIENT_ID
      },
      public_url: process.env.PUBLIC_URL,
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
        config_catalog_id: 1
      },
      // Should be disabled for production
      guest_user: true,
      apidoc: true,
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      game_skip: true,
      interactiveCanvasLibUrl: 'https://www.gstatic.com/assistant/interactivecanvas/api/interactive_canvas.min.js',
      rollbar: {
        clientToken: 'd858493f24794689b215a6b72b4324eb',
        serverToken: 'd858493f24794689b215a6b72b4324eb',
        enviroment: 'dev'
      }
    }
  }
}
