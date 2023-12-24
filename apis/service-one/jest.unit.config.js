const baseConfig = require('./jest.config.js');

module.exports = {
    ...baseConfig,
    coverageDirectory: './tests/unit',
    testMatch: ['**/tests/unit/**/*.test.[jt]s?(x)'],
};