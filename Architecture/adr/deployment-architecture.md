# Deployment infrastructure architecture


## Status

in progress

## Context

Wymagnia:
- konfiguracja środowisk z kodu
- jak najniższe koszty eksploatacji
- możliwość rozwoju i skalowania
- najlepiej możliwość uruchomienia w środowisku lokalnym i produkcyjnym
- prostota
- środowisko lokalne deweloperskie, środoiwsko prelease do testów integracyjnych, środowisko staginh do testów eksloatacyjnych, środowisko produkcyjne


Warianty:

|nazwa|opis|cena|
|---|---|---|
|cloud | baza danych as a service, heroku albo azure app services |
|jeden vps| instalacja wsyzstkich usług ręcznie |
|dwa vps | jeden dla bazy danych druga dla aplikacji (nginx, kestrel)|
|docker swarm na jednej maszynie| |
|kubernetes na jednej maszynie | |


Wymagania dla środowisk prod/stateg:
- wspólne logowanie z web, api, db
- security
- backup bazy
- self healing

Rozdzielenie środowisk prod/tage i testing
- wariant 1 - każde ma swoją maszynę, dla testing jest ona tworzona na czas testów i zamykana
- wriant 2 - środowisko test jest tworzone jakop namespace na wspólnej maszynie, w okresie nocnym - niskiego używania
- wariant 3 - na początku - testy integracyjne odbywają się na dysku lokalnym po przejściu dopiero jest commitowany kod i deployowany


Nie brane pod uwagę:
- pełna automatyzacja procesu - na tym etapie projektu, niewielkim zakresie zmian, nie jest wymagana pełna automatyzacja procesu

## Decision

- 

## Consequences

- 