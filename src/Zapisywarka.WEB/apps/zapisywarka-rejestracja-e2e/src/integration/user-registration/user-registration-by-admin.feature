# Feature: Tworzenie kont użytkowników przez administratora systemu

#     Scenario: Administrator tworzy konto organizatora zapisów
#         Given Aktualna data i godzina, to "2020-05-14 13:00"
#         And Administrator systemu wypełnił wymagane dane
#             | Nazwa konta organizatora zapisów | Nazwa właściciela konta | Hasło właściciela |
#             | Bochenek                         | Jan                     | Hasło1            |
#         When Zatwierdza utworzenie konta
#         Then Konto o nazwie "Bochenek" jest dodane do listy

#     Scenario: Administrator przegląda listę użytkowników
#         Given Utworzono następujące konta
#             | Nazwa konta organizatora zapisów | Nazwa właściciela konta | Hasło właściciela | Data utworzenia |
#             | Bochenek                         | Jan                     | Hasło1            | 2020-05-14      |
#         When Administrator otwiedza listę kont użytkowników
#         Then Widzi listę kont:
#          | Nazwa konta organizatora zapisów | Nazwa właściciela konta | Hasło właściciela | Data utworzenia |
#             | Bochenek                         | Jan                     | Hasło1            | 2020-05-14      |
#
# Given Konto o nazwie "Bochenek" jest dodane do listy
# And Użutkownik o loginie "Bochenek1" został stworzony
#
# Scenario: Użytkownik nie będący administratorem chce wejść na stronę rejestracji uzytkowników
#
#
#
# Scenario: Konto o podanej nazwie istnieje
# Given Administrator utworzył użytkownika
# | Nazwa konta | Login Administratora | Hasło konta |
# | Bochenek    | Bochenek1            | test3       |
# | CzadoweImprezy | mateusz | test3|
# And Administrator systemu wypełnił wymagane dane
# | Nazwa konta | Login właściciela| Hasło konta |
# | Bochenek    | Bochenek1            | test3       |
# When Zatwierdza utworzenie konta
# Then Konto nie jest utworzone i widzi komunikat "Konto o podanej nazwie istnieje"
#
# Scenario: Użytkownik o podanej nazwie istnieje
# Given Administrator utworzył użytkowników
# | Nazwa konta | Login Administratora | Hasło konta |
# | Bochenek    | Bochenek1            | test3       |
# | CzadoweImprezy | mateusz | test3|
# And Administrator systemu wypełnił wymagane dane
# | Nazwa konta | Login właściciela| Hasło konta |
# | Bochenek    | Bochenek1            | test3       |
# When Zatwierdza utworzenie konta
# Then Konto nie jest utworzone i widzi komunikat "Konto o podanej nazwie istnieje"
#
# Scenario: Administrator przegląda konta użytkowników
# Given Administrator utworzył użytkowników
# | Nazwa konta | Login Administratora | Hasło konta |
# | Bochenek    | Bochenek1            | test3       |
# | CzadoweImprezy   | mateusz            | test3       |
# Then Widzi listę kont
# | Nazwa konta | Login Administratora | Hasło konta | data utworzenia |
# | Bochenek    | Bochenek1            | test3       |22.04.21 godz.15:00|
# | Bochenek    | Bochenek1            | test3       |
# | CzadoweImprezy   | mateusz            | test3       |