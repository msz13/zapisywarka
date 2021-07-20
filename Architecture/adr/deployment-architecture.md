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
|cloud | baza danych as a service, heroku albo azure app services |
|jeden vps| instalacja wsyzstkich usług ręcznie |
|dwa vps | jeden dla bazy danych druga dla aplikacji (nginx, kestrel)|
|docker swarm na jednej maszynie| |
|kubernetes na jednej maszynie | |



Nie brane pod uwagę:
- pełna automatyzacja procesu - na tym etapie projektu, niewielkim zakresie zmian, nie jest wymagana pełna automatyzacja procesu

## Decision

- structureizr dsl z structureizr CLI

## Consequences

- structureizr dsl z structureizr CLI obsługuje wszystkie typy diagramó. Pozwala na export diagrmów do plant uml, który działa na moim komputerze. Wymaga java, którą mam.
