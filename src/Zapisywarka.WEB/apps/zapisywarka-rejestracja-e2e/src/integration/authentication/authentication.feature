Feature: Autentykacja poprzez login i hasło
    Indywidalni posiadacze kont organizatorów zapisów, 
    aby korzystać z aplikacji, 
    muszę się zautentykować poprzez podanie nazwy konta i hasła.


    Background:
        Given Organizator zapisów "Bochenek" zarejestrował konto z hasłem "Password_01"

    @story_11
    Scenario: Użytkownik poprawnie loguje się do systemu
        Given Posiadacz konta "Bochenek" podaje hasło "Password_01"
        When Próbuje się zalogować
        Then Powinien otrzymać dostęp do aplikacji

    @story_11
    Scenario Outline: Użytkownik podaje błędne dane
        Given Posiadacz konta "<nazwa_konta>" podaje hasło "<haslo>"
        When Próbuje się zalogować
        Then Nie ma dostępu do aplikacji i widzi komunikat " Błędny login lub hasło "
        
        Examples:
            | opis         | nazwa_konta | haslo       |
            | błędny login | jan_bledny  | Password_01 |
            | błędne hasło | Jan         | Bledne_01   |

    
   @story_11 @web
    Scenario: Niezalogowany użytkownik chce skorzystać z aplikacji
        When Niezalogowany użytkownik chce skorzystać z aplikacji
        Then Przekierowywany jest na stronę startową 
