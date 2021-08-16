Feature: Authentication

    
    Scenario: Niezalogowany użytkownik przekierowany jest na stronę logowania
        When Niezalogowany użytkownik chce wejśc na stronę główną
        Then Przekierowany jest na stronę logowania

   
    Scenario: Organizator zapisów poprawnie loguje się do systemu
        Given Konto organizatora zapisów o nazwie "Jan" i haśle "Password_01" zostało zarejestrowane
        And Kiedy wypełnia login "Jan" oraz hasło "Password_01"
        When Próbuje się zalogować
        Then Przekierowany jest na stronę główną aplikacji
        And Widzi swoją nazwę użytkownika "Jan"
          