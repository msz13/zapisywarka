Feature: Rejestracja użytkowników

    Aby organizatorzy zapisów mogli korzystać z systemu muszą stworzyć konto użytkownika

    Background:
        Given Stworzono następujący kod dostępu: "TbkdNPHf"            
        And Organizator zapisów podał kod dostępu "TbkdNPHf"


    Scenario: Użytkownik rejestruje się w systemie
        And Organizator zapisów wypełnił dane rejestracji konta
            | Nazwa_użytkownika | Hasło      | Potwierdzenie_hasła |
            | Jan_sz.cz-13      | Pasword_01 | Pasword_01          |
        When Próbuję się zarejestrować
        Then Baza użytkowników zawiera organizatora zapisów o imieniu "Jan_sz.cz-13"
        And Przekierowany jest na stronę logowania


    # Rule Nazwa użytkownika musi być poprawna

    Scenario Outline: Użytkownik podaje niepoprawną nazwę użytkownika
        Given Organizator zapisów podał nazwę użytkownika "<nazwa_uzytkownika>"
        When Próbuję się zarejestrować
        Then Nie może procedować rejestracji i widzi komunikat "<komunikat>"

        Examples: Niepoprawna nazwy użytkownika
            | opis                       | nazwa_uzytkownika                 | komunikat                                                                          |
            | krótsza niż 3 znaki        | ja                                | Nazwa użytkownika musi mieć minimum 3 znaki                                        |
            | dłuższa niż 32 znaki       | Abcdefghaijklmnoprstuwyzabcdefghi | Nazwa użytkownika musi mieć maksimum 32 znaki                                      |
            | zawiera niedozwolone znaki | jan/?#[]@!                        | zawiera niedozwolone znaki                                                         |
            | zawiera spację             | jan 1                             | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._                     |
            | zawiera polskie litery     | Bożena                            | Nazwa użytkownika nie może zawierać polskich znaków                                |
            | zawiera emoji              | jan😀                             | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._                     |
            | zawiera znaki na początku  | _jan                              | Nazwa użytkownika musi zaczynać się od tylko litery lub cyfry                      |
            | zawiera znaki na końcu     | jan.                              | Nazwa użytkownika musi kończyć się literą lub cyfrą                                |
            | zawiera dwa kolejne znaki  | jan.-sz                           | Nazwa użytkownika nie może zawierać dwóch lub więcej występujących po sobie znaków |




    # Rule: Użytkownicy powinni być unikalni
    Scenario Outline: Użytkownik, który próbuje się zarejestrować podaje istniejącą nazwę użytkownika
        Given Baza użytkowników zawiera następujących organizatorów
            | Nazwa_uzytkownika |
            | wojtek            |
        And Organizator zapisów podaje nazwię użytkownika "<nazwa_użytkownika>"
        When Próbuję się zarejestrować
        Then Nie może procedować rejestracji i widzi komunikat "Nazwa użytkownika już istnieje"

        Examples:
            | przypadek     | nazwa_użytkownika |
            | ta sama nazwa | wojtek            |
            | duza litera   | Wojtek            |


    # Rule: Wymagana jest odpowiednia siła hasła
    Scenario Outline: Użytkownik, który próbuje się zarejestrować podaje zbyt słabe hasło
        Given Organizator zapisów podał hasło "<haslo>"
        Then Nie może procedować rejestracji i widzi komunikat "<komunikat>"

        Examples: Niepoprawne hasła
            | opis                 | haslo                                                               | komunikat                         |
            | krótsza niż 8 znaków | passwor                                                             | Hasło musi mieć minimum 8 znaków  |
            | dłuższe niż 64 znaki | 'passw_123456789_123456789_123456789_123456789_123456789_123456789' | Hasło musi mieć maksimum 64 znaki |

    # Rule: Należy wymóc potwierdzenie hasła
    Scenario: Uzytkownik potwierdził nieprawidłoweg hasło
        Given Organizator zapisów podał hasło "Pasword_01"
        When Podaje potwierdzenie hasła "Pasword_02"
        Then Nie może procedować rejestracji i widzi komunikat "Podano błędne hasło"
