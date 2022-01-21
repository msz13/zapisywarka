Feature: Rejestracja przez organizatora

    Scenario: Sprzedawca po przyjęciu zamówienia widzi dodane zamówienie do listy zamówień
        Given "Jan" organizator zapisów stworzył ofertę zawierającą następujące pozycje:
            | Name                       |
            | Chleb wiejski              |
            | Chleb foremkowy z żurawiną |
            | Chleb foremkowy z oliwkami |
        And Jest "2020/08/20 15:00"
        When Sprzedawca zapisuje klienta o kodzie odbioru "Szczeciński", z uwagą "Odbierze żona Joanna", który zamówił:
            | Name                       | Quantity |
            | Chleb wiejski              | 1        |
            | Chleb foremkowy z żurawiną | 3        |
        Then Lista zapisów na ofertę zawiera zapis :
            | Data złozenia    | Numer zapisu | Kod odbioru | Uwagi                | Status        |
            | 2020/08/20 15:00 | 1            | Szczeciński | Odbierze żona Joanna | Zaakceptowane |
        And Zamówione pozycje:
            | Name                       | Quantity |
            | Chleb wiejski              | 1        |
            | Chleb foremkowy z żurawiną | 3        |

    Scenario: Stworzono ofertę
        Given "Jan" organizator zapisów wypełnił dane oferty
        When  stworzył ofertę zawierającą następujące pozycje
        Then Oferta jest dostępna, aby zapisywać klientów

    Scenario: Dodano zapis
        Given Oferta jest dostępna, aby zapisywać klientów
        And "Jan" organizator zapisów, dodaje zapis zawierający pozycje
        #    Then Zapis widnieje na liście
        #    Then Orgnaizator może przeglądać szczegóły zapisu
        Then Następujące pozycje są zarezerwowane dla klienta z kodem odbioru i uwagą:
            | Name                       | Quantity |
            | Chleb wiejski              | 1        |
            | Chleb foremkowy z żurawiną | 3        |
    #    Then Zapis jest dostępny, aby go potwierdzić


    Scenario: Rejestracja pacjenta
        Given Lekarz jest dostępny w poniedziałek
        When Pracownica rejestruje pacjenta
        Then Termin poniedziałek jest zarezerwowany