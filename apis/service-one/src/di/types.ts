export const TYPES = {
    AppLogger: Symbol.for('AppLogger'),
    exampleService: Symbol.for('exampleService'),
    exampleUserRepository: Symbol.for('exampleUserRepository'),
    DbConnection: Symbol.for('mysql'),
    exampleModel: Symbol.for('exampleModel'),
    HttpRequestCorrelationIdExtractor: Symbol.for(
        'HttpRequestCorrelationIdExtractor',
    ),
    AdminRoleValidator: Symbol.for('AdminRoleValidator'),
};
