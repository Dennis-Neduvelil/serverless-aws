import 'reflect-metadata';

import { Container } from 'inversify';
import { TYPES } from './types';
import { buildSharedDependenciesCommonModule } from '../../../shared/src/di/inversify.config';
import {
    IExampleService,
    exampleService,
} from '../services/exampleService';
import {
    IExampleUserRepository,
    ExampleUserRepository,
} from '../repositories/exampleUserRepository';

import { exampleUserModel } from '../models/exampleModel';

const container = new Container();
container.load(buildSharedDependenciesCommonModule());

container
    .bind<IExampleService>(TYPES.exampleService)
    .to(exampleService)
    .inSingletonScope();
container
    .bind<IExampleUserRepository>(TYPES.exampleUserRepository)
    .to(ExampleUserRepository)
    .inSingletonScope();
container
    .bind<exampleUserModel>(TYPES.exampleModel)
    .to(exampleUserModel)
    .inSingletonScope();

export default container;
