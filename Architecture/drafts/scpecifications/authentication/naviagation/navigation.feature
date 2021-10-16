   
    
    @story_11 
    Scenario: Niezalogowany użytkownik wchodzi na stronę główną aplikacji
        When Niezalogowany użytkownik odwiedza stronę główną aplikacji
        Then Przekierowywany jest na stronę startową
    
    @story_11 
    Scenario: Zalogowany użytkownik przekierowany jest na stronę główną aplikacji           
        Given Użytkownik loguje się zaznaczając opcję "Nie wylogowuj mnie"
        When Kiedy ponownie odwiedza stronę startową
        Then Przekierowywany jest na stronę główną aplikacji
    
    @story_11 
    Scenario: Użytkownik po logowaniu przekierowywany jest na stronę główną
        Given Niezalogowany użytkownik odwiedza stronę główną aplikacji
        When Poprawnie się loguje
        Then Przekierowywany jest na stronę główną aplikacji


    @story_11 
    Scenario: Użytko odwiedzający podstronę aplikacji przekierowywany jest ta podstronę po zalogowaniu
        Given Niezalogowany użytkownik odwiedza podstronę aplikacji
        Then Przekierowywany jest na stronę logowania
        When Poprawnie się loguje
        Then Przekierowywany jest na podstronę, na która pierwotnie wchodziłb