Feature: Rejestracja użytkowników

    Aby organizatorzy zapisów mogli korzystać z systemu muszą stworzyć konto użytkownika

    #   Background:
    #       Given Stworzono następujący kod dostępu: "TbkdNPHf"
    #       And Organizator zapisów podał kod dostępu "TbkdNPHf"


    Scenario: Użytkownik rejestruje się w systemie
        And Organizator zapisów wypełnił dane rejestracji konta
            | Nazwa        | Haslo      | PotwierdzenieHasla |
            | Jan_sz.cz-13 | Pasword_01 | Pasword_01         |
        When Próbuję się zarejestrować
        Then Baza użytkowników zawiera organizatora zapisów o imieniu "Jan_sz.cz-13"
# And Przekierowany jest na stronę logowania

