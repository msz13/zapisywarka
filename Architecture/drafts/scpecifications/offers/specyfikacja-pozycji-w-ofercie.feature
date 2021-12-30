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
            