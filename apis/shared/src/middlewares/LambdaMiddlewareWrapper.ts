import middy from '@middy/core';
import { AppLogger } from '@dennis-neduvelil/logger';
import {
    AuthorizationMiddleware,
    CorrelationIdExtractor,
    CorrelationIdMiddleware,
    EventValidationMiddleware,
    RoleValidator,
} from '@dennis-neduvelil/middy-middlewares';
import type { Handler } from 'aws-lambda';
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';
import { ValidationSchema } from './ValidationSchema';

export const removeEnvFromName = (name: string): string => {
    return name.replace('-qa-', '-').replace('-prod-', '-');
};

export const wrapWithMiddlewares = (
    appLogger: AppLogger,
    handler: Handler,
    tags: string[],
    options?: {
        correlationIdExtractor?: CorrelationIdExtractor,
        roleValidator?: RoleValidator,
        schema?: ValidationSchema,
        enableCors?: boolean,
    }
): Handler => {
    const {
        correlationIdExtractor,
        roleValidator,
        schema,
        enableCors = true, // Default value is true if not provided
    } = options || {};

    let wrappedHandler = middy(handler);

    if (enableCors) {
        wrappedHandler = wrappedHandler.use(
            cors({
                origins: [
                    'http://localhost:3000',
                    'http://192.168.0.181:3000'
                ],
            }),
        );
    }

    if (correlationIdExtractor) {
        const correlationIdMiddleware = CorrelationIdMiddleware.create(
            appLogger,
            correlationIdExtractor,
        ).getMiddlewareObject();
        wrappedHandler = wrappedHandler.use(correlationIdMiddleware);
    }

    if (roleValidator) {
        const authorizationMiddleware = AuthorizationMiddleware.create(
            appLogger,
            roleValidator,
        ).getMiddlewareObject();
        wrappedHandler = wrappedHandler.use(authorizationMiddleware);
    }

    if (schema) {
        const validationMiddleware = EventValidationMiddleware.create(
            appLogger,
            schema,
        ).getMiddlewareObject();
        wrappedHandler = wrappedHandler.use(validationMiddleware);
    }

    return wrappedHandler
        .use(httpErrorHandler());
};
