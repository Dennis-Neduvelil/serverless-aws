

![Logo](https://cdn.romexsoft.com/wp-content/uploads/2020/11/25165337/AWS-serverless.png)

# Serverless AWS Implementation in TypeScript with Dependency Injection [Domain-Driven Design | Repository Pattern]

## Overview

This project is a serverless implementation on AWS using TypeScript, designed with a Domain-Driven approach and leveraging Dependency Injection for modularity, understandability, and testability. The project is structured around separate domains, example: Order Domain, Inventory Domain, etc., with shared functionality in a "sharded" folder. Raw MySQL queries are used for flexibility and improved speed, along with the Repository Pattern for data access.


## Tech Stack

**Server:** AWS, TypeScript, Serverless, Inversify, Jest, SQL


## Table of Contents

- Prerequisites
- Project Structure
- Dependencies
- Getting Started
- Domain-Driven Design
- Dependency Injection
- Middleware and Middy
- Database
- Custom Packages
- Testing
- Logging
- Roles and Permissions
- Contributing
- License


## Prerequisites

- Node.js and npm installed
- AWS account with appropriate permissions
- Mysql (RDS/Local DB)
- Serverless Framework installed
```bash
  npm install -g serverless
```
## Project Structure

```bash
project-root (serverless-aws)
│
├── apis
    ├── shared
    │   ├── src
    │   │   ├── di
    │   │   ├── helpers
    │   │   └── middlewares
    │
    ├── serviceOne
    │   ├── order
    │   │   ├── config
    │   │   ├── src
    |   │   │   ├── di
    |   │   │   ├── entities 
    |   │   │   ├── exceptions
    |   │   │   ├── handlers
    |   │   │   ├── models 
    |   │   │   ├── repositorys
    |   │   │   └── services
    │   │   └── 
    |   │   │   ├── handlers
    |   │   │   ├── repositorys
    |   │   │   └── services
    ├── serviceTwo
    └── ...

```
## Dependencies

- `@keboola/middy-event-validator`: Middleware for validating AWS Lambda event payloads.
- `@middy/core`: Core library for Middy, a middleware framework for AWS Lambda.
- `@middy/http-cors`: Middleware for handling Cross-Origin Resource Sharing (CORS) in AWS Lambda.
- `@middy/http-error-handler`: Middleware for handling errors in AWS Lambda functions.
- `@types/source-map-support`: TypeScript types for the source-map-support library.
- `@dennis-neduvelil/exceptions`: Package for handling exceptions.
- `@dennis-neduvelil/logger`: Logging package.
- `@dennis-neduvelil/middy-middlewares`: Custom middlewares for Middy.
- `@dennis-neduvelil/mysql`: MySQL client package.
- `config`: Configuration management package.
- `http-status-codes`: Enumeration of HTTP status codes for Node.js.
- `inversify`: Powerful and lightweight inversion of control container for TypeScript.
- `joi`: Schema validation library.
- `reflect-metadata`: Library for reflecting the metadata of classes, useful for TypeScript decorators.
- `source-map-support`: Adds source map support to Node.js.
## Getting Started

1. Clone the repository:
``` bash
 git clone <repository-url>
```
2. Install dependencies:
``` bash
 cd apis/shared
 npm Install

 cd ../serviceOne
 npm Install
```
3. Configure AWS credentials:
``` bash
serverless config credentials --provider aws --key <aws-key> --secret <aws-secret>
```
4. Adjust serverless.yml configuration as needed.
5. Create environment file's `env-dev.yml` and `env-local.yml`:
``` bash
NODE_ENV:
LOG_LEVEL:
APP_PORT:
DB_HOST: 
DB_USERNAME: 
DB_PASSWORD:
DB_NAME: 
ACCESS_KEY: 
SECRET_KEY: 
REGION:
```
6. Deploy the project:
```bash
sls deploy --stage stage-name
```
## Domain-Driven Design

The project is structured based on the principles of Domain-Driven Design (DDD). Each domain (e.g., Order, Inventory) has its own set of controllers, services, and repositories, promoting separation of concerns and modular design.
## Dependency Injection

Dependency Injection is employed to enhance modularity and testability. Inversion of Control (IoC) containers can be used to manage and inject dependencies, making the code more maintainable and decoupled.
## Middleware and Middy

Middleware, including Middy packages, is utilized for various tasks such as event validation, CORS handling, and error management in AWS Lambda functions.
## Database

Raw MySQL queries are utilized for flexibility and improved speed. Each domain has its own repository responsible for handling database interactions using the repository pattern.
## Custom Packages

Custom packages, such as logging and MySQL client, are used to encapsulate and modularize functionality for improved maintainability.
## Testing

Testing is a crucial part of the development process. Use tools like Jest or Mocha for unit testing, and consider integration tests for serverless functions.

```bash
npm run test:unit
```
## Logging

Implement a robust logging mechanism to facilitate debugging and monitoring, leveraging the custom package `@dennis-neduvelil/logger` or other suitable solutions.
## Roles and Permissions

Utilize role-based access control for securing different functionalities within the application. AWS IAM roles and policies can be employed for this.
## Contributing

Feel free to contribute by opening issues or creating pull requests. Follow the established coding standards and best practices.
## License
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/)
License. Feel free to use and modify it as needed.
