import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

const initSentry = (dsn: string, environment: string) => {
  Sentry.init({
    dsn,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    environment,
  });
};

export const sentryConfig = (
  app: INestApplication,
  configService: ConfigService,
) => {
  const isSentryEnabled = configService.get<boolean>('sentry.enabled');

  if (isSentryEnabled) {
    const dsn = configService.get<string>('sentry.dsn');
    const environment = configService.get<string>('server.nodeEnvironment');

    initSentry(dsn, environment);

    const { httpAdapter } = app.get(HttpAdapterHost);
    Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));
  }
};
