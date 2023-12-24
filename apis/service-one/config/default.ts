import { env } from './env-loader';

const config = {
    appId: 'service-one-api',
    environment: process.env.NODE_ENV || 'development',
    logger: {
        enabled: true,
        level: env('LOG_LEVEL', 'Warn'),
    },
    requestLogger: {
        enabled: true,
    },
    accessLogger: {
        enabled: true,
    },
    aws: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region: process.env.REGION,
    },

    database: {
        dialect: 'mysql',
        host: env('DB_HOST', 'localhost'),
        port: +env('DB_PORT', 3306),
        username: env('DB_USERNAME', 'my_user'),
        password: env('DB_PASSWORD', 'my_password'),
        name: env('DB_NAME', 'my_database'),
        logging: false,
    },
};

export = { ...config, default: config };
