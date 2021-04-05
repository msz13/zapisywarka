Feature: Tworzenie ofert
    Aby móc zbierać zapisy, zgodnie z ustalonymi regułami
    Uprawniony pracownik dostawcy może tworzyć oferty,
    zwierające dostępne pozycje oraz reguły



    Scenario: Wypełniono dane podstawowe oferty
        Given Administrator wprowadza dane:
            | Nazwa oferty              | Data zakończenia zapisów oferty | Data rozpoczęcia odbioru oferty | Data zakończenia odbioru oferty |
            | Poniedziałek, 18 stycznia | 2020-02-14 16:00                | 2020-02-14 08:00                | 2020-02-14 17:00                |
        When Przechodzi do kolejnego kroku wypełniania oferty
        Then Może dalej procedować tworzenie oferty



#Rule: Minimalna i dopuszczalna lista wymagań

        Scenario: Brak podania minimalnych danych
        Given Administrator wypełnia tylko następującą informację: Data zakończenia odbioru
        When Przechodzi do kolejnego kroku wypełniania oferty
        Then Nie może dalej procedowac oferty
        And Widzi komunikaty:
            | Brakująca informacja              | Komunikat                                  |
            | Nazwa oferty                      | Wpisz nazwę oferty                         |
            | Data zakończenia zapisów          | Wprowadź datę zakończenia zapisów          |
            | Data rozpoczęcia odbioru zamówień | Wprowadź datę rozpoczęcia odbioru zamówień |

    Scenario Outline: Provided bad offer dates
        Given Pracownik wprowadza dane "<Data zakończenia zapisów oferty>", "<Data rozpoczęcia odbioru oferty>", "<Data zakończenia odbioru oferty>"
        When Przechodzi do kolejnego kroku wypełniania oferty
        Then Nie może dalej procedować oferty
        And  Widzi komunikat "<Komunikat>"
        Examples:
            | Data zakończenia zapisów oferty | Data rozpoczęcia odbioru oferty | Data zakończenia odbioru oferty | Komunikat                                                              |
            | 2020-02-14 16:00                | 2020-02-14 10:30                | 2020-02-14 10:29                | Data zakończenia odbioru nie może być mniejsza niż rozpoczęcia         |
            | 2020-02-14 16:00                | 2020-02-14 10:30                | 2020-02-14 15:59                | Data zakończenia odbioru nie może być mniejsza niż zakończenia zapisów |


Scenario: Offers name shoud be unique
     Given Administrator ofert stworzył ofertę o nazwie "Poniedziałek, 13.02"
     And Tworzny nową ofertę o nazwie "Poniedziałek, 13.02"
     When Przechodzi do kolejnego kroku wypełniania oferty
     Then Nie może dalej procedować oferty
     And Widzi komunikat "Nazwa oferty 'Poniedziałek, 13.02' została już użyta"


//Feature: New Offer Form - specify offer items list
 
Background: 
Given Administrator katalogu dodał pozycje katalogu
| Nazwa    | Kategoria | Cena | Dostępna ilość |
| Bochenek tradycyjny | Bochenki  | 9.00 | 90             |
| Foremkowy z ziarnami| Foremkowe | 6.00 | 60             |
| Foremkowy z żurawiną| Foremkowe | 6.00 | 60             |
 
 
Scenario: Administrator ofert dodaje pozycję z katalogu do oferty
When Zarządca ofert dodaje pozycje z katalogu 
| Nazwa    | 
| Bochenek tradycyjny| 
| Foremkowy z ziarnami| 
Then Lista pozycji oferty zawiera
| Nazwa    | Kategoria | Cena | Dostępna ilość |
| Bochenek tradycyjny | Bochenki  | 9.00 | 90             |
| Foremkowy z ziarnami| Foremkowe | 6.00 | 60             |
And Widzi podsumowanie wybranych pozycji oferty:
| Ilość dostępnych sztuk | Wartość oferty |
| 150                    | 1170           |
 
Scenario: Usunięcie pozycji z listy
Given Zarządca ofert dodał pozycje z katalogu 
| Nazwa    | 
| Bochenek tradycyjny| 
| Foremkowy z ziarnami| 
When Usuwa pozycję "Foremkowy z ziarnami"
Then Lista pozycji oferty zawiera
| Nazwa    | Kategoria | Cena | Dostępna ilość |
| Bochenek tradycyjny | Bochenki  | 9.00 | 90  |
And Widzi podsumowanie wybranych pozycji oferty:
| Ilość dostępnych sztuk | Wartość oferty |
| 90                   | 810         |
 
 
Scenario: Administrator ofert edytuje właściwości pozycji oferty
Given Zarządca ofert dodał pozycje z katalogu 
| Nazwa    | Kategoria | Cena | Dostępna ilość |
| Bochenek tradycyjny  | Bochenki  | 9.00 | 90             |
| Foremkowy z ziarnami | Foremkowe |6.00 | 60             |
When Edytuje właściwości pozycji "Bochenek tradycyjny" ustalając cenę na "8" i ilość "100"
Then Lista pozycji oferty zawiera
| Nazwa    | Kategoria | Cena | Dostępna ilość |
| Bochenek tradycyjny | Bochenki  | 8.00 | 100             |
| Foremkowy z ziarnami| Foremkowe | 6.00 | 60             |
And Widzi podsumowanie wybranych pozycji oferty:
| Ilość dostępnych sztuk | Wartość oferty |
| 160                    | 1160           |
 
 
Scenario: Administrator ofert nie dodał żadnych pozycji oferty
Given Zarządca ofert nie wskazał żadnej pozycji z katalogu 
When Chce dalej procedować przygotowanie oferty
And Widzi komunikat "Należy wskazać co najmniej jedną pozycję oferty"


