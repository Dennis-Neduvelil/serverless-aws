export const TYPES = {
    AppLogger: Symbol.for('AppLogger'),
    DbConnection: Symbol.for('mysql'),
    HttpRequestCorrelationIdExtractor: Symbol.for(
        'HttpRequestCorrelationIdExtractor',
    ),
    AdminRoleValidator: Symbol.for('AdminRoleValidator'),
};
