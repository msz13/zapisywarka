Feature: Przyjmowanie zapisu przez koordynatora zapisów


    Aby ułatwić zbieranie zapisów poprzez różne kanały i źródła, osoba przyjmująca zapisy,
    może przyjąć rezerwację, w imieniu klienta, który składa go osobiście, telefonicznie lub przez media społecznościowe.

    
    Background:
        Given Koordynator zapisów "Andrzej" jest zalogowany
        And Dostępny jest formularz zapisów, na ofertę "Poniedziałek" zawierającą następujące pozycje:
            | Nazwa                      |
            | Chleb wiejski              |
            | Chleb foremkowy z żurawiną |
            | Chleb foremkowy z oliwkami |
        And Jest "2020/08/20 15:00"


    Rule: Koordynator zapisów może dodać rezerwację wskazanych w ofercie pozycji

        @web @gh-76 @skip
        Scenario: Koordynator zapisów przyjmuje rezerwację - full workflow
            Given Koordynator oznacza rezerwację dla klienta następujących pozycji:
                | Nazwa                      | Ilość |
                | Chleb wiejski              | 1     |
                | Chleb foremkowy z żurawiną | 3     |
            And wprowadza dane rezerwacji:
                | Hasło odbioru | Uwagi                |
                | Szczeciński   | Odbierze żona Joanna |
            When Zatwierdza rezerwację
            Then Rezerwacja jest zapisana i zawiera powyższe informacje
            And Dodatkowe dane:
                | Data złożenia    | Numer rezerwacji |
                | 2020/08/20 15:00 | ABC-2022         |


        @api @gh-76
        Scenario: Koordynator zapisów poprawnie przyjmuje zapis
            Given Jan, przyjmujący zapisy, w ramach oferty "Poniedziałek" rezerwuje dla klienta następujące pozycje:
                | Nazwa                      | Ilość |
                | Chleb wiejski              | 1     |
                | Chleb foremkowy z żurawiną | 3     |
            And wprowadza dane rezerwacji:
                | Hasło odbioru | Uwagi                |
                | Szczeciński   | Odbierze żona Joanna |
            When Zatwierdza rezerwację
            Then Rezerwacja jest zapisana i zawiera powyższe informacje
            And Dodatkowe dane:
                | Data złożenia    | Numer rezerwacji |
                | 2020/08/20 15:00 | ABC-2022         |





