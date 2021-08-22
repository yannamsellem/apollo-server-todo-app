module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '\\.ts$': 'ts-jest',
    '\\.graphql$': '<rootDir>/src/__mocks__/graphql-transformer.js',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!ramda/.*)'],
}
