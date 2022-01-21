Feature: Strona główna

    Na stronie głównej zalogowany organizator zapisu może zobaczyć listę ofert.
    Dzięki temu będzie mógł łątwo nawigować, aby wykonywać poszczególne operacje
    związane z zapisami na daną ofertę.

    Background:
        Given Organizator zapisów "jan" zalogował się do aplikacji

    #Rule na stronie głównej organizator widzi listę utworzonych zapisów
    # posortowanych domyślnie od najnowszej daty utworzenia

    Scenario: Organizator zapisów odwiedza stronę główną aplikacji
        Given Organizator zapisów stworzył następującę oferty:
            | Nazwa        | Data utworzenia  |
            | Poniedziałek | 2021-12-18T15:13 |
            | Wtorek       | 2021-12-18T15:23 |
            | Środa        | 2021-12-18T15:33 |
        When Po zalogowaniu odwiedza aplikację
        Then Widzi następujące oferty:
            | Środa        | 2021-12-18T15:33 |
            | Wtorek       | 2021-12-18T15:23 |
            | Poniedziałek | 2021-12-18T15:13 |

    #Rule zapisy zakończone powinny znajdować się na końcu

    Scenario: Organizator zapisów zakończył jedną z ofert
        Given Organizator zapisów stworzył następującę oferty:
            | Nazwa        | Data utworzenia  | Status     |
            | Poniedziałek | 2021-12-18T15:13 | Aktywna    |
            | Wtorek       | 2021-12-18T15:23 | Zakońćzona |
            | Środa        | 2021-12-18T15:33 | Aktywna    |
        When Po zalogowaniu odwiedza aplikację
        Then Widzi następujące oferty:
          | Nazwa        | Data utworzenia  | Status     |
            | Środa        | 2021-12-18T15:33 | Aktywna |
            | Poniedziałek | 2021-12-18T15:13 | Aktywna
            | Wtorek       | 2021-12-18T15:23 | Zakończona | 



    #Rule organizator zapisów może widzieć tylko swoje oferty

    Scenario: W aplikacji kilku organizatorów zapisów stworzyło oferty
        Given Organizatorzy stworzyli następujące oferty:
            | Oferta               | Nazwa użytkownika |
            | Poniedziałek         | jan               |
            | Wtorek               | jan               |
            | Środa                | jan               |
            | Boże Narodzenie 2021 | kresowa           |
            | Wielkanoc 2021       | swojska           |
        When  Jan odwiedza stronę główną
        Then Widzi następujące oferty:
            | Oferta       | Nazwa użytkownika |
            | Poniedziałek | jan               |
            | Wtorek       | jan               |
            | Środa        | jan               |
