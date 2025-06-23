module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/cliente/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/cliente/src/$1'
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testMatch: [
    '<rootDir>/cliente/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/cliente/src/**/*.{spec,test}.{js,jsx}'
  ],
  roots: ['<rootDir>/cliente/src'],
  verbose: true,
  testEnvironmentOptions: {
    url: 'http://localhost:3001'
  }
};