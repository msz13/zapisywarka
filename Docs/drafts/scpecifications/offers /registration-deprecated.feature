Feature: Składanie zapisu przez organizatora

    Organizator może sam dokonać zapisu w imieniu klienta. by przyjąć zapis, który składa osobiście, telefonicznie lub przez media społecznościowe.
    Organizator może wskazać ilość pozycji, które klient chce zamówić.

    Scenario: Sprzedawca po przyjęciu zamówienia widzi dodane zamówienie do listy zamówień
        Given Organizator zapisów stworzy ofertę zawierającą następujące pozycje:
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

    #Rule po dodaniu zapisu organizator widzi jego szczegółowe podsumowanie
    Scenario: Organizator po dodaniu zapisu widzi jego szczegóły zapisu
        When Sprzedawca zapisuje klienta o kodzie odbioru "Szczeciński", z uwagą "Odbierze żona Joanna", który zamówił:
            | Nazwa pozycji              | Ilość |
            | Chleb wiejski              | 1     |
            | Chleb foremkowy z żurawiną | 3     |
        Then Widzi podsumowanie zamówienia:
            | Data złozenia    | Kod odbioru | Uwagi                | Status        |
            | 2020/08/20 15:00 | Szczeciński | Odbierze żona Joanna | Zaakceptowane |
        And Podsumowanie zawiera informację o pozycjach:
            | Name                       | Quantity |
            | Chleb wiejski              | 1        |
            | Chleb foremkowy z żurawiną | 3        |
    Błędne dane

    Scenario: Wszystkie pozycje mają wartość zero
        Given Organizator zapisów stworzy ofertę zawierającą następujące pozycje:
            | Name                       |
            | Chleb wiejski              |
            | Chleb foremkowy z żurawiną |
            | Chleb foremkowy z oliwkami |
        When Zapisuje klienta
        Then Widzi komunikat błędu "Wskaż co najmniej jedna pozycję zamówienia"

    #Rule Zapis, w którym nie podano kodu odbioru, kodem odbioru jest numer zamówienia
    Scenario: Nie podano kodów odbioru
        When Organizator zapisów zapisuje klienta nie podają kodu odbioru
        Then Zapis, który otrzymał numer "1", posiada kod odbioru "1"

            Scenario: Użytkwonik zapisuje klientów
        Given Jan stworzył formularz zapisów, który zawiera następujace pozycje:       
            | Nazwa pozycji |
            | Bochenek      |
            | Foremkowy     |
            | Foremkowy     |     
        When Sprzedawca zapisuje klientów o kodzie odbioru "Szczeciński", z uwagą "Odbierze żona Joanna" na następujące pozycje
            | Nazwa                      | Ilość |
            | Chleb wiejski              | 1     |
            | Chleb foremkowy z żurawiną | 2     |
       Then Lista zapisów na ofertę "Poniedziałek" zawiera rezerwację:
             | Numer zapisu | Data złożenia    | Kod odbioru | Uwagi                |  
             | 1            | 2020/08/20 15:00 | Szczeciński | Odbierze żona Joanna | 

#Czy zostawić numer zamówienia, jeśli nie to jaka będzie domyslny kod odbioru


 Scenario: Użytkwonik zapisuje klientów
        Given Jan stworzył formularz zapisów, który zawiera następujace pozycje:       
            | Nazwa pozycji |
            | Bochenek      |
            | Foremkowy     |
            | Foremkowy     |     
        And Rezerwuje pozycje 
            | Nazwa                      | Ilość |
            | Chleb wiejski              | 1     |
            | Chleb foremkowy z żurawiną | 2     |
        And Zapisuje dodatkowe dane 
         | Kod odbioru | Uwagi                  |
         | Szczeciński | "Odbierze żona Joanna" |
        When Zatwierdza zapis
        Then Lista zapisów na ofertę "Poniedziałek" zawiera rezerwację:
             | Numer zapisu | Data złożenia    | Kod odbioru | Uwagi                |  
             | 1            | 2020/08/20 15:00 | Szczeciński | Odbierze żona Joanna | 
        Then Informacja o zapisie zawiera następujące dane
             | Numer zapisu | Data złożenia    | Kod odbioru | Uwagi                |  
             | 1            | 2020/08/20 15:00 | Szczeciński | Odbierze żona Joanna | 
        And Pozycje 
            | Nazwa                      | Ilość |
            | Chleb wiejski              | 1     |
            | Chleb foremkowy z żurawiną | 2     |

#Rule Numer zamówienia jest unikalny dla właściciela konta

Scenario: Numer zamówienia
* Poprawny format numeru
| Przykład | Opis                    |
| 222222-F1ZS | numerZapisu-NumerOferty |


# Do decyzji
#czy kod obioru ma ograniczenia, np. jedno słowo, albo długośc, dostępne znaki

@Security
#Organizator może dodać zamówienie tylko do swoich ofert
#Tylko zalogowany moze wykonywac operacje

Background: 
    Given Organizator zapisów stworzy ofertę zawierającą następujące pozycje:
            | Name                       |
            | Chleb wiejski              |
            | Chleb foremkowy z żurawiną |
            | Chleb foremkowy z oliwkami | 
    And Jest "2020/08/20 15:00"

    Scenario: Zapis jest dodany jest do list zapisów
    Scenario: Lista zapisów zawiera
    Scenario: Zapis zawiera następujące szczegóły

    Scenario: Organizator dodał poprawny zapis 
    Then Powinien dodać zapis z sukcesem
    
             
        Given Przyjmujący zapisy uzupełnia dane klienta o kodzie odbioru "Szczeciński", z uwagą "Odbierze żona Joanna", który zamówił:
            | Name                       | Quantity |
            | Chleb wiejski              | 1        |
            | Chleb foremkowy z żurawiną | 3        |
        When Dokonuje zapisu
        Then Lista zapisów na ofertę zawiera zapis:

            | Data złozenia    | Numer zapisu | Kod odbioru | 
            | 2020/08/20 15:00 | 1            | Szczeciński | 
        And Szczegóły zapisu zawierają następujące pozycje

            | Name                       | Quantity |
            | Chleb wiejski              | 1        |
            | Chleb foremkowy z żurawiną | 3        |
        And Dodatkowe informacje:
        | Data_złożenia | Uwagi|
        |"2020/08/20 15:00" | "Odbierze żona Joanna"