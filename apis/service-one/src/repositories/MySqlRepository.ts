import { inject, injectable } from 'inversify';
import { Connection } from '@dennis-neduvelil/mysql';
import { TYPES } from '../di/types';

@injectable()
export abstract class MysqlRepository {
    protected readonly exampleTable: string = 'example-table';
    constructor(@inject(TYPES.DbConnection) protected connection: Connection) {}
}
