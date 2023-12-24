import { CorrelationIdExtractor } from '@dennis-neduvelil/middy-middlewares';
import { default as middy } from '@middy/core';

export class HttpRequestCorrelationIdExtractor
    implements CorrelationIdExtractor
{
    async extractCorrelationId(request: middy.Request): Promise<string | null> {
        const eventHeaders = request.event?.headers;
        for (const key in eventHeaders) {
            if (key.toLowerCase() === 'x-request-id') {
                return eventHeaders[key];
            }
        }
        return null;
    }
}
