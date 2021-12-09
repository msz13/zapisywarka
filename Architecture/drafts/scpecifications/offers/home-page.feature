Feature: Strona główna

    Na stronie głównej zalogowany organizator zapisu może zobaczyć listę ofert.
    Dzięki temu będzie mógł łątwo nawigować, aby wykonywać poszczególne operacje
    związane z zapisami na daną ofertę.

    Background:
        Given Organizator zapisów "jan" zalogował się do aplikacji


    Scenario: Organizator zapisów odwiedza stronę główną aplikacji
        Given Organizator zapisów stworzył następującę oferty:
            | Poniedziałek |
            | Wtorek       |
            | Środa        |
        When Po zalogowaniu odwiedza aplikację
        Then Widzi następujące oferty:
            | Poniedziałek |
            | Wtorek       |
            | Środa        |


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
            | Oferta               | Nazwa użytkownika |
            | Poniedziałek         | jan               |
            | Wtorek               | jan               |
            | Środa                | jan               |
