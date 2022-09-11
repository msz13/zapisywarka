Feature: Prezentacja formularza zbierania zapisów dla koordynatora

        Aby móc zbierać zapisy, na pozycje określone w swojej ofercie, 
        koordynator zapisów, może korzystać z formularza, 
        zawierającego pozycje określone w ofercie.
 

    Background:
        Given Koordynator zapisów "Andrzej" jest zalogowany

    @web @gh-76
    Scenario: Organizator zapisów tworzy ofertę

        Given Organizator zapisów stworzył ofertę o nazwie "Poniedziałek" zawierającą następujące pozycje:
            | Nazwa                      |
            | Chleb wiejski              |
            | Chleb foremkowy z żurawiną |
            | Chleb foremkowy z oliwkami |
        And Jest "2020/08/20 15:00"
        When Przegląda formularz rejestracji/formularz przyjmowania zapisów
        Then Formularz zapisów, zawiera powyższe dane