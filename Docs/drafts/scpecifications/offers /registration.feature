Feature: Składanie zapisu przez organizatora przez workflow

    Scenario: Składanie zapisu przez organizatora - workflow
        * Organizator zapisów stworzy ofertę "Poniedziałek" zawierającą następujące pozycje
            | Name                       |
            | Chleb wiejski              |
            | Chleb foremkowy z żurawiną |
            | Chleb foremkowy z oliwkami |
        * Sprzedawca zapisuje klienta o kodzie odbioru "Szczeciński", z uwagą "Odbierze żona Joanna", który zamówił:
            | Name                       | Quantity |
            | Chleb wiejski              | 1        |
            | Chleb foremkowy z żurawiną | 3        |
        * Lista zapisów na ofertę "Poniedziałek" zawiera zapis :
            | Data złozenia    | Numer zapisu | Kod odbioru | Uwagi                | Status        |
            | 2020/08/20 15:00 | 1            | Szczeciński | Odbierze żona Joanna | Zaakceptowane |
        * Następujące pozycje są zarezerwowane dla klienta:
            | Name                       | Quantity |
            | Chleb wiejski              | 1        |
            | Chleb foremkowy z żurawiną | 3        |
        * Organizator może przeglądać podsumowanie zapisów zawierające liczbę rezerwacji na dane pozycje:
            | Name                       | ReservedITems |
            | Chleb wiejski              | 1             |
            | Chleb foremkowy            | 0             |
            | Chleb foremkowy z żurawiną | 3             |
        * Organizator kończy zapisy

Feature: Tworzenie oferty zapisów

    Scenario: Sprzedawca tworzy formularz zapisów
        Given Jan organizator zapisów tworzy ofertę nazywającą się "Poniedziałek"
        When Zapisuje ofertę
        Then Oferta jest dostępna, aby zapisywać klientów

    Scenario: Utworzono dwie oferty z tą samą nazwą
        Given Administrator ofert stworzył "2021-12-18T15:13" ofertę o nazwie "Poniedziałek, 13.02" 
        And There is "2021-12-18T15:23"
        And Tworznoy nową ofertę o nazwie "Poniedziałek, 13.02"
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

#Rule: Specyfikacja zapisów powinna być poprawna
    Scenario Outline: Organizator zapisów tworzy ofertę ze złą nazwą
        Given Jan organizator zapisów tworzy ofertę nazywającą się 
        When Zapisuje ofertę
        Then Widzi komunikat błędu Nazwa oferty musi mieć maksimum 200 znaków

        Examples:
            | Opis | Nazwa | Informacja |
            | zbyt długa nazwa  | 0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890 | Nazwa oferty może mieć maksymalnie 210 znaków |
           # | brak nazwy | | Nazwa oferty jest wymagana |

Feature: Specyfikacja pozycji oferty
    Pozycje oferty są integralną jej częścią.
    Organizator zapisów, aby ułatwić sobie zbieranie zapisów, musi wskazać pozycje oferty, na które będzie zbierał zapisy.

     Scenario: Organizator zapisów wskazuje pozycje oferty   
        Given Jan organizator zapisów tworzy ofertę nazywającą się "Poniedziałek"
        And Wskazuje pozycje oferty
            | Name                       | Cena |
            | Chleb wiejski              |
            | Chleb foremkowy z żurawiną |
            | Chleb foremkowy z oliwkami |
        When Zapisuje ofertę
        Then Oferta zawiera pozycje oferty
            | Name                       | Cena |
            | Chleb wiejski              |
            | Chleb foremkowy z żurawiną |
            | Chleb foremkowy z oliwkami |

              #Rule dodanie listy pozycji

    Scenario: Dodanie listy pozycji
        Given Organizator zapisów wskazuje pozycje oferty:
            | ProductName     | Category         | Unit |
            | Chleb wiejski   | Chleb tradycyjny | Szt  |
            | Chleb foremkowy | Chleb foremkowy  | Szt  |
            | Kawa            | Kawy             | Kg   |
        When Zapisuje ofertę
        Then Następujące pozycje są widoczne na formularzu zapisów:
            | ProductName                | Category         | Jednostka |
            | Chleb wiejski              | Chleb tradycyjny | Szt       |
            | Chleb foremkowy            | Chleb foremkowy  | Szt       |
            | Chleb foremkowy z żurawiną | Kawy             | Kg        |

             #Rule podgląd pozycji ofert

    Scenario: Dodanie listy pozycji
        When Organizator zapisów wskazuje pozycje oferty:
            | ProductName     | Category         | Unit |
            | Chleb wiejski   | Chleb tradycyjny | Szt  |
            | Chleb foremkowy | Chleb foremkowy  | Szt  |
            | Kawa            | Kawy             | Kg   |
        Then Następujące pozycje są widoczne na formularzu tworzenia oferty:
            | ProductName                | Category         | Jednostka |
            | Chleb wiejski              | Chleb tradycyjny | Szt       |
            | Chleb foremkowy            | Chleb foremkowy  | Szt       |
            | Chleb foremkowy z żurawiną | Kawy             | Kg        |

    #Rule: Lista pozycji nie może być pusta.

    Scenario: Lista pozycji nie może być pusta.
        Given Organizator zapisów nie wskazał zapisów
        When Zapisuje ofertę
        Then Widzi komunikat "Oferta mu zawierać conajmniej jedną pozycję"

        #Rule Organizator może usunąć pozycję w czasie tworzenia
        Given Organizator zapisów dodaje pozycje oferty:
            | ProductName     |
            | Chleb wiejski   |
            | Chleb foremkowy |
        When Usuwa "Chleb foremkowy" z listy pozycji
        Then Lista pozycji zawiera:
            | ProductName   |
            | Chleb wiejski |

        #Rule Organizator może zmienić nazwę pozycji w czasie tworzenia
        Given Organizator zapisów dodał pozycję "Chleb wiejski"
        When Zmienia nazwę na "Chleb tradycyjny"
        Then Lista pozycji zawiera "Chleb tradycjny"

        #Rule Nazwa pozycji nie może być pusta
        Given Organizator zapisów dodał pozycję ""
        When Zapisuję ofertę
        Then Widzi komunikat błędu "Nazwa pozycji nie może być pusta"

        #Rule Nazwa pozycji musi być poprawna


        #Rule Dodane kategorie podpowiadają się organizatorowi

        Scenario Organizator zapisów wskazuje te same kategorieg
        Given Organizator zapisów wskazuje pozycje oferty:
            | ProductName     | Category         |
            | Chleb wiejski   | Chleb tradycyjny |
            | Chleb foremkowy | Chleb foremkowy  |
        When Dodaje kolejny zapis z kategorią "for"
        Then He can choose category "Chleb foremkowy"


    #Rule Organizator zapisów musi wsakać jednostkę

    Scenario: Dostępne jednostki
        When Organizator zapisów wybiera jednostkę ilości pozycji
        Then Widzi opcje do wyboru:
            | Szt. |
            | Kg   |
            | l.   |

    #Rule Organizator może porządkować kolejność zapisów
 
        Given Organizator zapisów dodaje pozycje oferty:
            | ProductName     |
            | Chleb wiejski   |
            | Chleb foremkowy |
            | Bułka |
        When Przesuwa pozycję "Bułka" na początek listy
        Then Lista pozycji zawiera:
            | Bułka |
            | ProductName   |
            | Chleb wiejski |
            