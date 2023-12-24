import { baseHandler } from '../../../src/handlers/exampleHandler';
import { APIGatewayProxyResult, Callback, Context } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import container from '../../../src/di/inversify.config';
import { AppLogger } from '@dennis-neduvelil/logger';
import { TYPES } from '../../../src/di/types';
import { mock } from 'jest-mock-extended';
import { IExampleService } from '../../../src/services/exampleService';

describe('baseHandler', () => {
    const context = null as unknown as Context;
    const callback = null as unknown as Callback<APIGatewayProxyResult>;
    const mockLogger = mock<AppLogger>();
    container.rebind(TYPES.AppLogger).toConstantValue(mockLogger);
    const id = '1';
    const event = {
        pathParameters: { id },
        body: JSON.stringify({}),
    };

    it('should be do something', async () => {

    });
});
