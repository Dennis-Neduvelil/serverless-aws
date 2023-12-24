import { Connection } from 'mysql';
import { ExampleUserRepository } from '../../../src/repositories/exampleUserRepository';

jest.mock('mysql');

const mockConnection = {
    query: jest.fn(),
    runInTransaction: jest.fn(),
};

class MockMysqlRepository extends ExampleUserRepository {
    constructor(connection: Connection) {
        super(connection);
    }
}

describe('Example User Repository', () => {
    describe('get the wash inventory by wash inventory Id:', () => {
        let exampleUserRepository: ExampleUserRepository;
        const dbUser = {};

        beforeAll(() => {
            exampleUserRepository = new MockMysqlRepository(
                mockConnection as Connection,
            );
        });

        beforeEach(() => {
            mockConnection.query.mockClear();
            mockConnection.runInTransaction.mockClear();
        });
        it('should do something', async () => {
        });
    });
});
