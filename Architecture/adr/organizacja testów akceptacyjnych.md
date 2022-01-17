
# Organizacja testów akcpetacyjnych

## Status

in-progress

## Context

Jak zorganizowac testy akceptacyjnych poszczególnych komponentów systemu frontend i backend
1. Jedne testy dla całej aplikacji, tylko częśc zaimplementowana dla backendu i frondentdu
2. Jedne scenariusze, ale uruchomiany odpowiedni driwer za pomocą tagów
3. Odzielne specyfikacje dla każdej z aplikacji frondent i backend i jedne wspólne

Jak zorganizować pipeline:
- jeden dla całej aplikacji, uruchomienie procesów na podstawie nx affected
- osobne joby dla web i api uruchamiane na podstawie affacted
- osobne workflowy


Jakie środowiska testowe:
1.Front - ng serve
2.APi - docker + baza danych, albo tylko testy na port/adapteres
3.E2E - pełne środowisko wdrożeniowe

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


#### strategia testowania

Testy api
|rodzaj testu| zakres | narzędzie | uwagi |
| --- | --- | --- | --- |
|unit | feature, aggregates, infrastructure/domain services, controllers?? | nunit | |
| integrations | feature + db (docker, in memory) | nunit | alternatywa |
| api | e2e | cypress/ cypress+cucumber/ specflow+restassured / postman/ asp integration | 



tesety web

testy e2e


## Decision



## Consequences
