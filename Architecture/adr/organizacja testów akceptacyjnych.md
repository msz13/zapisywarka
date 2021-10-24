
<<<<<<< HEAD
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




## Decision



## Consequences
=======
>>>>>>> cb32d24... Create organizacja testów akceptacyjnych.md
