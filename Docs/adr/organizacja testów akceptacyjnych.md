
# Organizacja testów akcpetacyjnych

## Status

in-progress

## Context

Jak zorganizowac testy akceptacyjnych poszczególnych komponentów systemu frontend i backend
1. Jedne testy dla całej aplikacji, tylko częśc zaimplementowana dla backendu i frondentdu
2. Jedne scenariusze, ale uruchomiany odpowiedni driwer za pomocą tagów
3. Odzielne specyfikacje dla każdej z aplikacji frondent i backend

Rodzaje testów
- WEB - mogą być e2e i mockiem API
- API
- e2e - user journeys

Logika w CI/CD
1. Jesli deployment jest api - robią się testy api, i user yourneys
2. Jesli web  - testy web i user yourneys

Testy REst API:
- brak testów, tylko e2e
- testy integracyjne asp core
- testy w innym nażedziu - cypress, postman, jako c# klient
- contrcat testing

Co testować:
- autoryzację
- mapowanie
- routing 
- poprawne kody błędów

Alternatywny podział testów - tagi:
1. Scenariusze mają tagi
2. Gdy api, lub web uruchamiane są poszczególne testy, na podstawie tagów

Alternatywny podział testów - test driver:
1. Istnieją jedne testy, ale jest różna implementacja za pomocą test driver
2. Gdy api, lub web wstrzykiwane są odpowiednie web drivery na podstawie tagow

Test framework
specflow, czy light bdd framework: https://github.com/LightBDD/LightBDD
gdy sotsujemy screanplay pattern, trochę zasadnosc stosowania gherkin spada
brakuej tylko raportów

#### strategia testowania

##### Testy api
|rodzaj testu| zakres | narzędzie | środowisko | uwagi |
| --- | --- | --- | --- | --- |
|unit | feature, aggregates, infrastructure/domain services, controllers?? | nunit | |
| integrations | feature + db (docker, in memory) | nunit | alternatywa |
| api | e2e | cypress/ cypress+cucumber/ specflow+restassured / postman/ asp integration | 

tesety web
|rodzaj testu| zakres | narzędzie |  środowisko | uwagi |
| --- | --- | --- | --- | --- |
| domain libs |
| compents |
| page | 
| compoenents interaction|
| visual |
| accesibilty |
| worflow - ui acceptance | cypress/ cypress+cucumber/ |  | ng serve |


testy e2e
|rodzaj testu| zakres | narzędzie | środowisko | uwagi |
| --- | --- | --- | --- | --- |
| acceptance | user-flows | cypress/ cypress+cucumber/ specflow+playwright | namspace in cluster |


poziomy testów akceotacyjnych
1. workflow/user journey/ feature
2. steps UI i NON UI
3. business rules

cześc scenariuszy będzie się powtarzać??

scenario składa się z:
command
query




## Decision

### Wzorce testów automatycznych
- użycie wzorca "Screanplay pattern" z "TestDataBuilders";
Taki wcorzec pozwala na dowolną kompozycję zadań użytkownika (Task i Queries). Pozwala na różną implementację zadań użytwkonika (np. poprzez UI lub zapytania Rest) z wykorzystaniem wspólnych danych (komend). Użycie komend pozwala również na łatwe konwertowanie tabeli gherkin na instancje komend. W konsekwencji zadania użytkownika mogą być implementowane jako proste funcions factories.

## Consequences
