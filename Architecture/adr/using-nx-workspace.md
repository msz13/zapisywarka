# Wykorzystanie nx workspace


## Status

accepted

## Context

W projekcie Zapisywarka.WEB 


## Decision

- wykorzystano bibliotekę nx oraz podejście monorepo do aplikacji

## Consequences

- nx zapewnia automatyczną integrację z cypress oraz storybook
- ułatwia tworzenie przejrzystej architektury
- podział kody na aplikację i biblioteki, mimo, że obecnie jest nadmiarowy, w przyszłości ułatwi dodawanie kolejnych aplikacji klienckich, np. do zakupów klientów lub panel administratora, lub aplikacji mobilnych
- usprawnia build time, analizując zmienion kod
