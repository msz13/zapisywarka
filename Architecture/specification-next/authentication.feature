Feature: Authentication


    Scenario: Niezalogowany użytkownik przekierowany jest na stronę logowania
        When Niezalogowany użytkownik chce wejśc na stronę główną
        Then Przekierowany jest na stronę logowania

    Scenario: Administrator poprawnie loguje się do systemu
        Given Użytkownik o loginie "Admin" i haśle "Password_01" został zarejestrowany w systemie
        And Kiedy poprawnie wypełnia login "Admin" oraz hasło "Password_01"
        When Próbuje się zalogować
        Then Przekierowany jest na stronę główną aplikacji


    Scenario: Użytkownik nie istnieje
        Given W systemie zarejestrowano następujących użytkowników
            | Login |
            | Admin   |
        And Kiedy użytkownik podał login "Jan"
        When Próbuje się zalogować
        Then Powinien zobaczyć komunikat o błędzie

Scenario: Użytkownik nie podał danych dostępowych

Scenario: Użytkownik podał błędne hasło



#
#Scenario: On server error should show error
#

Scenario: Zalogowany użytkownik widzi na stronie swoje dane
Given  Użytkownik o loginie "Jan" i haśle "Password_01" został zarejestrowany w systemie 
And Posiada rolę "AccauntOwner"
When Poprawnie się zalogował
Then  Widzi swój login "Jan"  i nazwę konta "Bochenek"
#

Scenario: Administrator próbuje się zalogować

Given  Użytkownik o loginie "Admin" i haśle "Password_01" został zarejestrowany w systemie 
And Posiada rolę "administrator"
And Poprawnie wypełnił dane logowania
When Próbuje się zalogować
Then  Przekierowany jest na stronę panelu administratora

Scenario: Organizator zapisów próbuje się zalogować
Given  Użytkownik o loginie "Jan" i haśle "Password_01" został zarejestrowany w systemie 
And Posiada rolę "AccauntOwner"
And Poprawnie wypełnił dane logowania
When Próbuje się zalogować
Then  Przekierowany jest na stronę rejestracji zapisów

#Scenario: Zalogowany organizator zapisów widzi stronę główną

Rule: System powinien umożliwiać ponowne wejście bez potrzeby logowania

Scenario: Użytkownik próbuje ponownie użyć aplikacji, gdyoznaczył opcję "nie wylogowuj mnie"
 Given Użytkownik "Bochenek1" zalogował się do sysytemu o 30 kwietnia 2021 o godz. 10:00
And Oznaczył opcję nie wylgowywuj mnie 
 When Ponownie wchodzi na stronę 30 kwietnia 2021 o godz. 10:30
 And Może zobaczyć nazwę konta "Bochenek"
 And Może zobaczyć nazwę użytkownika

 
Scenario: Użytkownik próbuje ponownie użyć aplikacji, gdy nie oznaczył opcji "nie wylogowuj mnie"
 Given Użytkownik "Bochenek1" zalogował się do sysytemu o 30 kwietnia 2021 o godz. 10:00
And Oznaczył opcję nie wylgowywuj mnie 
 When Ponownie wchodzi na stronę 30 kwietnia 2021 o godz. 10:30
 And Może zobaczyć nazwę konta "Bochenek"
 And Może zobaczyć nazwę użytkownika
#
# Ponowne logowanie, gdy sesja się skończyła
# Autentyczne odświeżenie tokena zalogowane użytkownila
