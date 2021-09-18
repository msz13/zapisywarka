Feature: Autentykacja

Background: 
    Given Konto organizatora zapisów o nazwie "Jan" i haśle "Password_01" zostało zarejestrowane

    @story_11  
    Scenario: Użytkownik poprawnie loguje się do systemu  
        Given Użytkownik odwiedza stronę logowania    
        And Kiedy wypełnia login "Jan" oraz hasło "Password_01"
        When Próbuje się zalogować
        Then Przekierowany jest na stronę główną aplikacji
        And Widzi swoją nazwę użytkownika "Jan"
    
    @story_11 
    Scenario: Niezalogowany użytkownik wchodzi na stronę główną aplikacji
        When Niezalogowany użytkownik odwiedza stronę główną aplikacji
        Then Przekierowywany jest na stronę główną startową
    
    @story_11 
    Scenario: Zalogowany użytkownik przekierowany jest na stronę główną aplikacji           
        Given Użytkownik loguje się zaznaczając opcję 'Nie wylogowuj mnie'
        When Kiedy ponownie odwiedza stronę startową
        Then Przekierowywany jest na stronę główną aplikacji
    
    @story_11 
    Scenario: Użytkownik nie istnieje
        Kiedy Kiedy wypełnia login "jan_bledny" oraz hasło "Password_01"
        When Próbuje się zalogować
        Then Widzi komunikat "Podano błędny login lub hasło"

    @story_11 
    Scenario: Użytkownik podał błędne hasło
        Kiedy Kiedy wypełnia login "jan" oraz hasło "Bledne_01"
        When Próbuje się zalogować
        Then Widzi komunikat "Podano błędny login lub hasło"
