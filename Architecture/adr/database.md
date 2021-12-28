# Wybór hostingu bazy danych

### Wymagania
- koszt do 40 zł
- jak najmniesze czas włożony w utrzymanie bazy
- walory edukacyjne
- nie narzuca rozwiązań architektonicznych
- łatwość przenoszenia między dostawcami clauda


### Warianty
1. POstgresql hostowany na kubernetes
2. Własna instancja postgresa na serwerze
3. Elephant Postgresql
4. 5. Menaged db od claud providerów
6. https://www.scaleway.com - 10 dolarów miesięcznie
7. Servless database
    1. MongoDb Atlas
    2. CockroachDB (relacyjna, api postgresql, free plans)(nie ma jasnej integracji z teraform, można hostować na kubernetes, ale ma duże wymagania zasobów, servless beta) 

| Wariant | Koszt w fazie rozwoju * | Koszt przy dużym ruchu  | Vendor lock | Łatwość utrzymania | Niezawodność | Uwagi |
|---|---|---|---|---|---|---|
| Elephant | 0 | 49$ | Nie | Tak | Tak | |
| Baza na serwerze | 4 Euro | 64 - 90 $ vs 12 eu * | nie | mała | tak   | |
| Baza kubernetes | 5,5 eu | 11 eu | nie | średnia | nie | docelowo będzie tanśze utrzymanie |
| Cockroach dedicated| free | 310$ | nie | Tak | Tak | |
| Cockroach servless | free | 310$ | nie | Tak | NIE | Trzeba sie nauczyć |
| GC SQL | 32 $ | 93$ | Tak | TAK | TAK | |
| ScaleGrid | 10$ | 88$ * | nie | tak | tak| |

* Min 2 gm RAM, min 10 gb storage, HA (min. 2 instancje)

** google compute engine 2 instance 1 vCore 3,75 ram, albo hetzner 2 x 2 vcore 4 gb |
* scalegrid na gcp

### Wnioski

Zrobić soak i load testy dla kubernetes oraz cockrach. Dla pokazów użytkownikom uruchomić google claud run + elephant.
