# Wybór hostingu bazy danych

### Wymagania
- koszt do 40 zł
- jak najmniesze czas włożony w utrzymanie bazy
- walory edukacyjne
- nie narzuca rozwiązań architektonicznych


### Warianty
1. POstgresql hostowany na kubernetes
2. Własna instancja postgresa na serwerze
3. Elephant Postgresql
4. 5. Menaged db od claud providerów
6. https://www.scaleway.com - 10 dolarów miesięcznie
7. Servless database
    1. MongoDb Atlas
    2. CockroachDB (relacyjna, api postgresql, free plans)(nie ma jasnej integracji z teraform, można hostować na kubernetes, ale ma duże wymagania zasobów, servless beta) 

| Wariant | Koszt w fazie rozwoju * | Koszt przy dużym ruchu  | Vendor lock | Łatwość utrzymania | Niezawodność |
|---|---|---|---|---|---|
| Elephant | 0 | 49$ | Nie | Tak | Tak |
| Baza na serwerze |
| Baza kubernetes |
| cockroach | 
| GC SQL | 0 | 93$ | Tak | TAK | TAK |

* Min 2 gm RAM, min 10 gb storage, HA (min. 2 instancje)

