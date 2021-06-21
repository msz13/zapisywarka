Feature: Authentication

    
    Scenario: Niezalogowany użytkownik przekierowany jest na stronę logowania
        When Niezalogowany użytkownik chce wejśc na stronę główną
        Then Przekierowany jest na stronę logowania

    Scenario: Administrator poprawnie loguje się do systemu
        Given Użytkownik o loginie "Admin" i haśle "Password_01" został zarejestrowany w systemie
        And Kiedy wypełnia login "Admin" oraz hasło "Password_01"
        When Próbuje się zalogować
        Then Przekierowany jest na stronę główną aplikacji
        And I widzi swój login "Admin"
