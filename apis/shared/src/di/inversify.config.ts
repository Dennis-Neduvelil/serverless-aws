import 'reflect-metadata';

import { ContainerModule } from 'inversify';
import config from 'config';
import { TYPES } from './types';
import { AppLogger, LogLevel } from '@dennis-neduvelil/logger';
import { Connection } from '@dennis-neduvelil/mysql';

import {
    CorrelationIdExtractor,
    RoleValidator,
} from '@dennis-neduvelil/middy-middlewares';
import { HttpRequestCorrelationIdExtractor } from '../middlewares/HttpRequestCorrelationIdExtractor';
import { AdminRoleValidator } from '../middlewares/AdminRoleValidator';

export type AppLoggerConfig = {
    logLevel: LogLevel;
    appId: string;
};

export function buildSharedDependenciesCommonModule(dbRequired: boolean = true): ContainerModule {
    return new ContainerModule((bind) => {
        bind<config.IConfig>('config').toConstantValue(config);
        const logLevel: string = config.get<string>('logger.level');
        const logger: AppLogger = new AppLogger(
            config.get<string>('appId'),
            LogLevel[logLevel],
        );

        logger.setPretty(true);
        logger.enable(true);

        bind<AppLogger>(TYPES.AppLogger).toConstantValue(logger);

        if (dbRequired) {
            const databaseConfig = config.get<object>('database');
            const connection = new Connection({
                host: databaseConfig.host,
                port: databaseConfig.port,
                user: databaseConfig.username,
                password: databaseConfig.password,
                database: databaseConfig.name,
            });
            bind<Connection>(TYPES.DbConnection).toConstantValue(connection);
        }
        bind<CorrelationIdExtractor>(
            TYPES.HttpRequestCorrelationIdExtractor,
        ).toConstantValue(new HttpRequestCorrelationIdExtractor());
        bind<RoleValidator>(TYPES.AdminRoleValidator).toConstantValue(
            new AdminRoleValidator(),
        );
    });
}
