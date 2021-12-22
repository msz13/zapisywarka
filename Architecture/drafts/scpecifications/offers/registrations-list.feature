Feature: Przeglądanie listy zapisów

    Organizator zapisów może przeglądać listę złożonych przez siebie zapisów,
    aby wiedzieć kto złozył zapis i móc potwierdzić ich odbiór.
 

Background:
Given Organizator stworzył ofertę Poniedziałek 

    
    Scenario: Organizator zapisów przegląda listę zapisów
        
        Given Złożył następujące zapisy dla tej oferty:
            | Data złozenia    | Numer zapisu | Kod odbioru | Uwagi                | 
            | 2020/08/20 13:00 | 1            | Szczeciński | Odbierze żona Joanna | 
            | 2020/08/20 14:30 | 2            | Jan         |                      |
            | 2020/08/20 15:00 | 3            | Kowalski    |                      | 
        When Odwiedza listę zapisów
        Then Widzi następujące informacje o liście zapisów:
        |Numer zamówienia | Kod odbioru | Data zamówienia | 

    Scenario: Paginacja 
    Given Organizator zapisał 50 klient
    When Odwiedza listę zapisów
    Then Widzi pierwsze 10 zapisów

    Scenario: Paginacja2 
    Given Organizator zapisał 50 klient
    When Przechodzi do drugiej strony zapisów
    Then Widzi 20 kolejnych zapisów
      
      
      #Wyszukiwanie zapisu po kodzie odbioru
      
