module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'esbuild-jest',
    },
    collectCoverageFrom: [
        // './src/**/*.ts',
        './tests/**/*.ts',
    ],
    setupFilesAfterEnv: ['./jest.env.setup.js'],
    // collectCoverage: true,
    testResultsProcessor: 'jest-sonar-reporter',
    coverageReporters: ['lcov', 'json', 'html', 'text', 'text-summary'],
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.build/'],
};