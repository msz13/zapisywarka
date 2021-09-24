const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/offer-creation',
    '<rootDir>/libs/catalog/domain',
    '<rootDir>/libs/authentication/domain',
    '<rootDir>/libs/identity/sign-up',
    '<rootDir>/libs/identity/login',
  ],
};
