Feature: Authentication

    
    Scenario: Niezalogowany użytkownik przekierowany jest na stronę logowania
        When Niezalogowany użytkownik chce wejśc na stronę główną
        Then Przekierowany jest na stronę logowania

    Scenario: Administrator poprawnie loguje się do systemu
        Given Użytkownik o loginie "Admin" i haśle "Password_01" został zarejestrowany w systemie
        And Kiedy poprawnie wypełnia login "Admin" oraz hasło "Password_01"
        When Próbuje się zalogować
        Then Przekierowany jest na stronę główną aplikacji


# Scenario: Użytkownik nie istnieje

# Scenario: Użytkownik podał błędne hasło

#
#Scenario: On server error should show error
#

#
# Scenario: Zalogowany użytkownik widzi na stronie swoje dane
# And Może zobaczyć nazwę konta "Bochenek"
# And Może zobaczyć nazwę użytkownika
#
# Scenario: Zalogowany administrator widzi panel administratora
#
#
#
# Scenario: Ponowne wejście na stronę w trakcie trwającej sesji
# Given Użytkownik "Bochenek1" zalogował się do sysytemu o 30 kwietnia 2021 o godz. 10:00
# When Ponownie wchodzi na stronę 30 kwietnia 2021 o godz. 10:30
# And Może zobaczyć nazwę konta "Bochenek"
# And Może zobaczyć nazwę użytkownika
#
# Ponowne logowanie, gdy sesja się skończyła
# Autentyczne odświeżenie tokena zalogowane użytkownila
