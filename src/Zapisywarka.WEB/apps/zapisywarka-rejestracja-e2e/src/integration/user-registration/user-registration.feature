# Czy rejestracja użytkowników powinna być w razor pages, czy angular
# Czy rejestrując konto użytwkonik powinien podać nazwę organizacji
# czy rejestrując użytkownika tworzy się niezależne id konta

Feature: Rejestracja użytkowników

    Aby organizatorzy zapisów mogli korzystać z systemu muszą stworzyć konto użytkownika

    Background:

        Given: Stworzono następujące kody dostępu:
            | TbkdNPHf |
            | 7VY77kOH |
            | Zx0YuCwh |
            | 6KTOTkWI |
            | xp6829gG |
            | xIn73teb |
            | c8hmhtB6 |
            | OrA8N1y9 |

    Scenario: Użytkownik rejestruje się w systemie
        Given Organizator zapisów podał kod dostępu "TbkdNPHf"
        And Organizator zapisów wypełnił dane rejestracji konta
            | Nazwa_użytkownika | Hasło      | Potwierdzenie_hasła |
            | Jan13             | Pasword_01 | Pasword_01          |
        When Próbuję się zarejestrować
        Then Baza użytkowników zawiera organizatora zapisów o imieniu "Jan13"
        And Przekierowany jest na stronę logowania

     