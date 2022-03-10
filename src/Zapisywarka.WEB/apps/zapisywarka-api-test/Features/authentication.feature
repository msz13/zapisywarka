Feature: Autentykacja poprzez login i hasło
    Posiadacze kont organizatorów zapisów,
    aby korzystać z aplikacji,
    muszę się zautentykować poprzez podanie nazwy konta i hasła.


    Scenario: Użytkownik poprawnie loguje się do systemu
        Given Organizator zapisów zarejestrował konto jako użytkownik "Bochenek" z hasłem "Password_01"
        And Podaje poprawne dane logowania
        When Próbuje się zalogować
        Then Powinien otrzymać dostęp do swojego konta w aplikacji

    Scenario: Niezalogowany subsrybent chce uzyskać dostęp do konta
        When Niezalogowany użytkownik chce otrzymać dostęp do swojego konta
        Then Widzi komunikat błędu