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


Feature: Wskazanie pozycji oferty

    Organizator zapisów, aby ułatwić sobie zapisywanei zamówień, musi wskazać pozycje oferty,
    na które będzie zbierał zapisy.

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

        Scenario Organizator zapisów wskazuje te same kategorie
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
            
Feature: Zakończenie zapisu po zakończeniu daty zapisów

    Jako organizator zapisów, oczekuje, aby po zakończeniu okresu zbierania zapisów, 
    oferta osiągnęła status zakończonej, 
    aby łatwiej było filtorwać spośród wielu ofert, 
    aby uniemożliwić składanie zapisów przez klientów i współpracowników.

    Scenario: Zapis jest złożony po zakończeniu zapisów
   Given Sprzedawca w ofercie wskazał termin zakończenia zapisów na "2020/08/25 16:00"
   And Jest "2020/08/25 16:01"
   When Sprzedawca przegląda listę ofert
   Then  Oferta ma status "Zakończona"