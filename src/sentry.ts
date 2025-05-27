import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://e4669b965a4dc9a15998a67b154dca31@o4509394137448448.ingest.de.sentry.io/4509394139021392',
  environment: process.env.NODE_ENV,
  sendDefaultPii: true,
});
