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
<<<<<<< HEAD
            | Numer zamówienia | Kod odbioru | Data zamówienia |

    Scenario: Paginacja
        Given Organizator zapisał 50 klient
        When Odwiedza listę zapisów
        Then Widzi pierwsze 10 zapisów

    Scenario: Paginacja2
        Given Organizator zapisał 50 klient
        When Przechodzi do drugiej strony zapisów
        Then Widzi 20 kolejnych zapisów


Feature: Filtrowanie zamówień w ofercie po kodzie odbioru

    Aby łatwo móc obejrzeć szczegółowy zapisu, organizator zapisów może je wyszukać
    na podstawie kodu odbioru.
    #Rule Można zamówienia wyszukać po kodzie odbioru

    Background:
        Given Oferta zawiera zapisy z następującymi kodami:
            | Numer zapisu | Kod odbioru |
            | 1            | kowalski    |
            | 2            | kójcik      |
            | 3            | wójcikowski |
            | 3            | swój        |


    Scenario Outline: Organizator wyszukuje zamówienie na podstawie kodu odbioru
        When Organizator zapisów wyszukuje zapis na podsawie  <fraza_wyszukiwania>
        Then Lista zapisów zawiera zapisy z nastepującymi kodami odbioru: <kody_odbioru>

        Examples:
            | fraza_wyszukiwania | kody_odbioru                        |
            | w                  | kowalski, wójcik, wójcikowski, swój |
            | wó                 | wójcik, wójcikowski                 |
            | wój                | wójcik, wójcikowski,                |
            | wójciko            | wójcikowski                         |

=======
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
      
>>>>>>> 5e0f0181fac6c23177a1509197e8ec80b025138d
