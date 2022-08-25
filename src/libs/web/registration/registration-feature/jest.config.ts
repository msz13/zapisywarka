/* eslint-disable */
export default {
  displayName: 'web-registration-registration-feature',
  preset: '../../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory:
    '../../../../coverage/libs/web/registration/registration-feature',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
 transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],

 //transformIgnorePatterns: ['node_modules/(?!@angular|rxjs|@datorama/akita)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
