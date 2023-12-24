import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler,
} from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import container from '../di/inversify.config';
import { TYPES } from '../di/types';
import { IExampleService } from '../services/exampleService';
import { BadRequestException } from '@dennis-neduvelil/exceptions';
import { AppLogger } from '@dennis-neduvelil/logger';
import { wrapWithMiddlewares } from '../../../shared/src/middlewares/LambdaMiddlewareWrapper';
import Joi from 'joi';


export const baseHandler: Handler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    const exampleService = container.get<IExampleService>(
        TYPES.exampleService,
    );
    const logger = container.get<AppLogger>(TYPES.AppLogger);
    try {
        if (!event.body) {
            throw new BadRequestException(
                'Invalid payload',
            );
        }
        const params = JSON.parse(event.body) as any;
        await exampleService.getAllExampleUsers();
        return {
            statusCode: StatusCodes.OK,
            body: JSON.stringify({
                message: 'success',
            }),
        };
    } catch (err) {
        logger.error(
            'api failed',
            undefined,
            ['example-handler'],
            {
                event,
                err,
            },
        );
        return {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            body: JSON.stringify({
                error: {
                    message: (err as Error).message,
                },
            }),
        };
    }
};

const schema = {
    params: {},
    body: {},
    headers: {},
    pagination: false,
};
export const handler: Handler = wrapWithMiddlewares(
    container.get(TYPES.AppLogger),
    baseHandler,
    ['example-handler'],
    {
        enableCors: true,
        schema,
        roleValidator: container.get(TYPES.AdminRoleValidator),
        correlationIdExtractor: container.get(
            TYPES.HttpRequestCorrelationIdExtractor,
        ),
    },
);
