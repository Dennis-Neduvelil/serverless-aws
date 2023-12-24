export class exampleUserNotFoundException extends Error {
    constructor(id: string) {
        id !== '0' ? super(`User with id ${id} was not found`) : super(`No users found`);
        this.name = 'exampleUserNotFoundException';
    }
}
