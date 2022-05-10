Feature: Logowanie pełny workflow

Scenario: Logowanie pełny workflow

@story_11
    Scenario: Użytkownik poprawnie loguje się do systemu
        * Organizator zapisów wypełnił dane rejestracji konta
            | Nazwa_użytkownika | Hasło      | Potwierdzenie_hasła |
            | Jan_sz.cz-13      | Pasword_01 | Pasword_01          |
        * Próbuję się zarejestrować
        * Jest przekierowany na stronę logowania
        * Podaje nazwę użytkownika i hasło "Password_01"
        * Próbuje się zalogować
        * Powinien otrzymać dostęp do swojego konta w aplikacji