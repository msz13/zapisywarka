Feature: Kreator formularza zapisów
    Organizator zapisów musi stworzyć formularz zapisów, aby w łatwy sposób móc wprowadzać zapisy klientów.
    W formularzu będzie zawierał ofertę, na którą będzie zbierał zapisy.
    W kolejnych wersjach aplikacji poprzez formularz będą mogli składać również klienci.

    Abo
    Organizator tworzy ofertę. Następnie dostępny jest formularz, który zapiwera elementy z oferty.


    Scenario: Sprzedawca tworzy formularz zapisów
        Given There is "2021-12-18T15:13"
        Given Jan organizator zapisów tworzy ofertę nazywającą się "Poniedziałek"
        When Zapisuje ofertę
        Then Lista ofert zawiera:
            | Nazwa oferty | Data utworzenia  |
            | Poniedziałek | 2021-12-18T15:13 |
         Or Oferta jest dostępna pod adresem
         Or Przekierowany jest do formularza oferty



    Scenario: Utworzono dwie oferty z tą samą nazwą
        Given Administrator ofert stworzył ofertę o nazwie "Poniedziałek, 13.02" "2021-12-18T15:13"
        And There is "2021-12-18T15:23"
        And Tworzny nową ofertę o nazwie "Poniedziałek, 13.02"
        When Zapisuje ofertę
        Then Lista ofert zawiera:
            | Nazwa oferty        | Data utworzenia  |
            | Poniedziałek, 13.02 | 2021-12-18T15:13 |
            | Poniedziałek, 13.02 | 2021-12-18T15:13 |

    Scenario: Utworzono ofertę bez nazwy
        Given Jan organizator zapisów tworzy ofertę nazywającą się ""
        When Zapisuje ofertę
        Then Lista ofert zawiera:
            | Nazwa oferty     | Data utworzenia  |
            | Oferta bez nazwy | 2021-12-18T15:13 |
            | Zapisy bez nazwy | 2021-12-18T15:13 |

    Scenario: Nazwa oferty jest zbyt długa
        Given Jan organizator zapisów tworzy ofertę nazywającą się "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
        When Zapisuje ofertę
        Then Widzi komunikat błędu Nazwa oferty musi mieć maksimum 200 znaków



