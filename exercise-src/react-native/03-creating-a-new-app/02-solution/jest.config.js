module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleNameMapper: {
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
  },
};
