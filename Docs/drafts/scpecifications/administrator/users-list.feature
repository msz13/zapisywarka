Feature: Przeglądanie bazy użytkowników przez administratora

    Administrator chce wiedzieć, kto korzysta z aplikacji. W początkowym etapie przeglądanie listy poprze API. 

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