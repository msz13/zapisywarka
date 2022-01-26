Feature: Tworzenie oferty zapisów

    @first-story
    Scenario: Organizator zapisów tworzy ofertę
        Given Jan organizator zapisów wskazał nazwę oferty "Poniedziałek"
        When Zapisuje ofertę
        Then Oferta zapisów o nazwie "Poniedziałek" jest dostępna aby zbierac zapisy

    Scenario: Organizator zapisów tworzy oferty z tą samą nazwą
        Given Administrator ofert stworzył ofertę o nazwie "Poniedziałek"
        And Tworzy nową ofertę o nazwie "Poniedziałek"
        When Zapisuje ofertę
        Then Dostępne są następujące oferty
            | Nazwa oferty  |
            | Poniedziałek  |
            | Poniedziałek2 |

    
    Scenario: Organizator zapisów tworzy kilka ofert bez nazwy
        Given Administrator ofert stworzył ofertę o nazwie "Poniedziałek"
        And Administrator ofert stworzył ofertę o nazwie ""
        And Administrator ofert stworzył ofertę o nazwie ""
        When Zapisuje ofertę
        Then Dostępne są następujące oferty:
            | Nazwa oferty |
            | Poniedziałek |
            | Oferta1      |
            | Oferta2      |

    Scenario: Nazwa oferty jest zbyt długa
        Given Jan organizator zapisów tworzy ofertę nazywającą się "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
        When Zapisuje ofertę
        Then Widzi komunikat błędu Nazwa oferty musi mieć maksimum 200 znaków

