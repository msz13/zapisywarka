Feature: Authentication

   
Scenario: Niezalogowany użytkownik przekierowany na stronę logowania
When Niezalogowany użytkownik chce wejśc na stronę główną
Then Przekierowany jest na stronę logowania


# 
#Scenario: On server error should show error
#
# Scenario: Niezalogowany użytkownik przekierowany na stronę logowania
# When Niezalogowany użytkownik chce wejśc na stronę główną
# Then Przekierowany jest na stronę logowania
# 
# 
# 
# Scenario: Potwierdzono tożsamość użytkownika
# Given Użytkownik "Bochenek1" został zarejestrowany z hasłem "hasło1" jako właściel konta "Bochenek"
# And Został przekierowany na stronę logowania
# When Kiedy poprawnie wypełnia dane
# | Nazwa użytkownika | Hasło |
# | Bochenek          | hasło1| 
# Then Przekierowany jest na stronę główną
# 
# Scenario: Zalogowany użytkownik widzi na stronie swoje dane
# And Może zobaczyć nazwę konta "Bochenek"
# And Może zobaczyć nazwę użytkownika
# 
# Scenario: Zalogowany administrator widzi panel administratora
# 
# 
# Scenario: Użytkownik nie istnieje
# 
# Scenario: Użytkownik podał błędne hasło
# 
# Scenario: Ponowne wejście na stronę w trakcie trwającej sesji
# Given Użytkownik "Bochenek1" zalogował się do sysytemu o 30 kwietnia 2021 o godz. 10:00
# When Ponownie wchodzi na stronę 30 kwietnia 2021 o godz. 10:30
# And Może zobaczyć nazwę konta "Bochenek"
# And Może zobaczyć nazwę użytkownika
# 
# Ponowne logowanie, gdy sesja się skończyła
# Autentyczne odświeżenie tokena zalogowane użytkownila
