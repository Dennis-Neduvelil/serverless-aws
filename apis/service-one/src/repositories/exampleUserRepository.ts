import { injectable } from 'inversify';
import { MysqlRepository } from './MySqlRepository';
import { DBexampleUser } from '../entities/exampleEntity';

export interface IExampleUserRepository {
    getExampleUser(Id: string): Promise<DBexampleUser>;
    getExampleUserList(): Promise<DBexampleUser[]>;
}

@injectable()
export class ExampleUserRepository
    extends MysqlRepository
    implements IExampleUserRepository {
    async getExampleUser(Id: string): Promise<DBexampleUser> {
        const query = `select query from table ${this.exampleTable} where a =?, b= ?, c= ?`
        return this.connection.query(query, ['parameters', 'if', 'any'])
    }

    async getExampleUserList(): Promise<DBexampleUser[]> {
        const query = `select query from table ${this.exampleTable} where a =?, b= ?, c= ?`
        return this.connection.query(query, ['parameters', 'if', 'any'])
    }
}
