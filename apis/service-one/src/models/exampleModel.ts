import { injectable } from 'inversify'
import { DBexampleUser, exampleUser } from '../entities/exampleEntity';

@injectable()
export class exampleUserModel {
    public buildUserList(
        DBexampleUser: DBexampleUser[],
    ): exampleUser[] {
        return DBexampleUser
            .map((current) => this.buildUser(current))
            .filter((c) => !!c);
    }

    public buildUser(DBexampleUser: DBexampleUser): exampleUser {
        return {
            id: DBexampleUser.id,
            age: DBexampleUser.age,
            fullName: DBexampleUser.full_name
        };
    }
}
