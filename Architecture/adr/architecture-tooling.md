# Narządzia do obrazowania architectury


## Status

accepted

## Context

Jakie narzędzia wybrać do tworzenia architektury w modelu C4:
- diagramy w draw.io
- structureizr dsl na na stronie structureizr
- structureizr dsl z structureizr CLI
- dotnet client
- typescript client
- plant uml

Kryteria wyboru:
- musi doprowadzić do stworzenia dokumentu architektury z wykorzystaniem diagramów, przechowywanym w reposytorium github
- wsparcie dla wszystkich diagramów (w dynamic i deployment)
- łatwość edycji i zmian
- jak najmniejsza potrzeba instalacji nowych narzędzi na środowisku lokalnym


Nie brane pod uwagę:
- pełna automatyzacja procesu - na tym etapie projektu, niewielkim zakresie zmian, nie jest wymagana pełna automatyzacja procesu

## Decision

- structureizr dsl z structureizr CLI

## Consequences

- structureizr dsl z structureizr CLI obsługuje wszystkie typy diagramó. Pozwala na export diagrmów do plant uml, który działa na moim komputerze. Wymaga java, którą mam.
