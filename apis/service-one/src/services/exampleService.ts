import { inject, injectable } from 'inversify';
import { TYPES } from '../di/types';
import { exampleUser } from '../entities/exampleEntity';
import { exampleUserNotFoundException } from '../exceptions/exampleUserNotFoundException';
import { exampleUserModel } from '../models/exampleModel';
import { IExampleUserRepository } from '../repositories/exampleUserRepository';

export interface IExampleService {

    getExampleUser(Id: string): Promise<exampleUser>;
    getAllExampleUsers(): Promise<exampleUser[]>
}

@injectable()
export class exampleService implements IExampleService {
    public constructor(
        @inject(TYPES.exampleModel)
        private readonly exampleModel: exampleUserModel,
        @inject(TYPES.exampleUserRepository)
        private readonly exampleUserRepository: IExampleUserRepository,
    ) { }

    async getExampleUser(id: string): Promise<exampleUser> {
        const dbUser = await this.exampleUserRepository.getExampleUser(id);
        if (!dbUser) {
            throw new exampleUserNotFoundException(id);
        }
        return this.exampleModel.buildUser(dbUser);
    }

    async getAllExampleUsers(): Promise<exampleUser[]> {
        const dbUsers = await this.exampleUserRepository.getExampleUserList();
        if (dbUsers.length === 0) {
            throw new exampleUserNotFoundException('0');
        }
        return this.exampleModel.buildUserList(dbUsers);
    }
}
