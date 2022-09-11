Feature: Rejestracja użytkowników

    Aby organizatorzy zapisów mogli korzystać z systemu muszą stworzyć konto użytkownika.


    Scenario: Użytkownik rejestruje się w systemie

        When Koordynator zapisów próbuje się zarejestrować z poprawnymi danymi:
            | Nazwa        | Haslo      | PotwierdzenieHasla |
            | Jan_sz.cz-13 | Pasword_01 | Pasword_01         |
        Then Rejestracja kończy się sukcesem



