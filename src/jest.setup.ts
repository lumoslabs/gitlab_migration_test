import '@testing-library/jest-dom';
import * as Aphrodite from 'aphrodite';
import * as AphroditeNoImportant from 'aphrodite/no-important';

Aphrodite.StyleSheetTestUtils.suppressStyleInjection();
AphroditeNoImportant.StyleSheetTestUtils.suppressStyleInjection();

// jest.mock('next/config', () => () => ({
//   serverRuntimeConfig: {
//     google: {
//       client_id: 'google_client_id'
//     },
//     public_url: 'http://nest.dev',
//     dynamodb: {
//       prefix: 'dev_',
//       endpoint: 'localhost:8005',
//       sslEnabled: false,
//       region: 'local-env',
//     }
//   },
//   publicRuntimeConfig: {
//     interactiveCanvasLibUrl: 'https://www.gstatic.com/assistant/interactivecanvas/api/interactive_canvas.min.js',
//     rollbar: {
//       clientToken: '-',
//       serverToken: '-',
//       enviroment: 'dev'
//     }
//   }
// }))
