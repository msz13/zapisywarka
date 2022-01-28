Feature: Modyfikacja pozycji oferty przed zapisem

    Organizator zapisów, aby móc poprawić, wcześniej wprowadzone informacje o pozycjach oferty, może je edytować.

    @web
    Scenario: Jan organizator zapisów poprawia dane pozycji ofert przed publikacją
        Given Jan organizator zapisów wskazał pozycje oferty:
            | Nazwa     | Jednostka |
            | Bochenek  | szt.      |
            | Foremkowy | kg        |
        When Zmienia dane pozycji "Bochenek" na:
            | Nazwa                | Jednostka |
            | Foremkowy z pieprzem | szt.      |
        Then Oferta zawiera następujące pozycje/Podgląd oferty zawiera następujące pozycje:
            | Nazwa                | Jednostka |
            | Bochenek             | szt.      |
            | Foremkowy z pieprzem | szt.      |

    @web
    Scenario: Jan organizator zapisów zmienia kolejność pozycji ofert przed publikacją

        Given Jan organizator zapisów wskazał pozycje oferty:
            | Nazwa                |
            | Bochenek             |
            | Foremkowy z pieprzem |
            | Foremkowy z żurawiną |
        When Przesuwa pozycję "Bochenek" na koniec
        Then Oferta zawiera następujące pozycje/Podgląd oferty zawiera następujące pozycje:
            | Nazwa                |
            | Foremkowy z pieprzem |
            | Foremkowy z żurawiną |
            | Bochenek             |