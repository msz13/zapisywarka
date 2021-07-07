Feature: Rejestracja użytkowników

    Aby organizatorzy zapisów mogli korzystać z systemu muszą stworzyć konto użytkownika

    Background:

        Given: Stworzono następujący kod dostępu:
            | TbkdNPHf |


    Scenario: Użytkownik rejestruje się w systemie
        Given Organizator zapisów podał kod dostępu "TbkdNPHf"
        And Organizator zapisów wypełnił dane rejestracji konta
            | Nazwa_użytkownika | Hasło      | Potwierdzenie_hasła |
            | Jan_sz.cz-13      | Pasword_01 | Pasword_01          |
        When Próbuję się zarejestrować
        Then Baza użytkowników zawiera organizatora zapisów o imieniu "Jan13"
        And Przekierowany jest na stronę logowania


    # Rule Nazwa użytkownika musi być poprawna

    Scenario: Użytkownik podaje niepoprawną nazwę użytkownika
        Given Organizator zapisów podał kod dostępu "TbkdNPHf"
        And Organizator zapisów podał nazwę użytkownika <nazwa_uzytkownika>
        When Próbuję się zarejestrować
        Then Nie może procesować rejestracji i widzimi komunikat<komunikat>

        Examples: Niepoprawne nazwy użytkownika
            | opis                       | nazwa_uzytkownika                 | komunikat                                                                          |
            | krótsza niż 3 znaki        | ja                                | Nazwa użytkownika musi mieć minimum 3 znaki                                        |
            | dłuższa niż 32 znaki       | Abcdefghaijklmnoprstuwyzabcdefghi | Nazwa użytkownika musi mieć maksimum 32 znaki                                      |
            | zawiera niedozwolone znaki | jan/?#[]@!                        | zawiera niedozwolone znaki                                                         | jan/?#[]@! | zawiera niedozwolone znaki | jan/?#[]@! | zawiera niedozwolone znaki | jan/?#[]@!| zawiera niedozwolone znaki | jan/?#[]@!                        | zawiera niedozwolone znaki                                     | jan/?#[]@!| zawiera niedozwolone znaki | jan/?#[]@!| zawiera niedozwolone znaki | jan/?#[]@!$&'()*+,.`|;=~          | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |                                                                  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |'()*+,.               | ;=                                                             | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |'()*+,.`              | ;=~                                                            | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ | '()*+,. | ;= | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |'()*+,.` | ;=~ | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ | '()*+,. | ;= | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ | '()*+,.` | ;=~ | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ | '()*+,. | ;= | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |'()*+,.` | ;=~ | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ | '()*+,. | ;= | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ | '()*+,.` | ;=~ | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ | '()*+,. | ;= | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ | '()*+,.` | ;=~ | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ | '()*+,. | ;= | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ | '()*+,.` | ;=~ | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ | '()*+,. | ;= | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |  | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._ |
            | zawiera spację             | jan 1                             | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._                     |
            | zawiera polskie litery     | Bożena                            | Nazwa użytkownika nie może zawierać polskich znaków                                |
            | zawiera emoji              | jan😀                             | Nazwa użytkownika może zwierać tylko litery, cyfry, znaki: -._                     |
            | zawiera znaki na początku  | _jan                              | Nazwa użytkownika musi zaczynać się od tylko litery lub cyfry                      |
            | zawiera znaki na końcu     | jan.                              | Nazwa użytkownika musi kończyć się literą lub cyfrą                                |
            | zawiera dwa kolejne znaki  | jan.-sz                           | Nazwa użytkownika nie może zawierać dwóch lub więcej występujących po sobie znaków |




    # Rule: Użytkownicy powinni być unikalni
    Scenario Outline: Użytkownik, który próbuje się zarejestrować podaje istniejącą nazwę użytkownika
        Given Baza użytkowników zawiera następujących organizatorów
            | Nazwa_użytkownika |
            | wojtek            |
        When Organizator zapisów próbuje utworzyć konto użytkownika <nazwa_użytkownika>
        Then Nie może procesować rejestracji i widzimi komunikat "Nazwa użytkownika już istnieje"

        Examples:
            | przypadek     | nazwa_użytkownika |
            | ta sama nazwa | wojtek            |
            | duza litera   | Wojtek            |