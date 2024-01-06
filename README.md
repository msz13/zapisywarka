# Zapisywarka

### Scope
1. User story map
(https://github.com/msz13/zapisywarka/blob/main/Zapisuwarka%20MVP%20-%20User%20Story%20Map.jpg)
3. [Backlog](https://github.com/users/msz13/projects/3/views/1)
4. [Workflow](https://github.com/users/msz13/projects/4)

### Architecture
- beckend:
  * modular monolith
  * vertical slice architecture
- fronend:
  * [tactical DDD](https://www.angulararchitects.io/en/blog/tactical-domain-driven-design-with-monorepos/)

### Features specyfication
### Project graph
apps and libraries:
angular.json
### Local dovelepment infrastructure
* docker
* node >= v14.18.1
* dotnet => 6.0.2
### CLI Commands

### Implemented features
#### Domain model spike
* [Specyfication](https://github.com/msz13/zapisywarka-deprecated/blob/main/WEB-API/RegistrationFunctionalTests/Features/Zapisy.feature))
* [Functional tests](https://github.com/msz13/zapisywarka-deprecated/tree/main/WEB-API/RegistrationFunctionalTests)
* [Unit test](https://github.com/msz13/zapisywarka-deprecated/tree/main/WEB-API/RegistrationUnitTests)
* [Implementation](https://github.com/msz13/zapisywarka-deprecated/tree/main/WEB-API/RegistrationBD)
#### Frontend:
* sign-up:
  *  [integration tests(cypress && storybook)](src/apps/test/libs/identity/sign-up-feature-e2e)
  *  [implementation and unit tests](src/libs/web/identity/sign-up-feature)
* login:
  * [integration tests(cypress && storybook)](src/apps/test/libs/identity/login-feature-e2e)
  * [implementation and unit tests](src/libs/web/identity/login-feature)
* registration:
  * [integration test(spectactor library)](src/libs/web/registration/registration-feature/src/lib/_features_tests)
  * [implementation and unit tests](src/libs/web/registration/registration-feature)

#### Backend
* [acceptance tests](src/apps/zapisywarka-api-test)
* indentity domain:
  * [integration tests](src/libs/api/identity/identity-core-test)
  * [implementation- core-module(vertical slice architecture)][src/libs/api/identity/identity-core]
  * [implementation - rest controllers](src/libs/api/identity/identity-api)
* reservations domain:
  * [unit tests](src/libs/api/reservations/reservations-api-test)
  * [implementation](src/libs/api/reservations/reservations-api)
    
#### CRUD spike - items catalog:
CRUD feature (without tests)
Catalog
* [Web](https://github.com/msz13/zapisywarka/tree/main/src/libs/web/catalog)
* [Api](https://github.com/msz13/zapisywarka/tree/main/src/libs/api/catalog)

### Deployment infrastructure
* [Hetzner vpc with microk8s kubernetes]
* [Orale Cloud instance with k3os kubernetes]


