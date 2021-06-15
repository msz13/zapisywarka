Feature: Walidacja rejestracji konta
    
    Scenario: Użytkownik rejestruje się w systemie
        Given Organizator zapisów podał kod dostępu "TbkdNPHf"
        And Organizator zapisów wypełnił dane rejestracji konta
            | Nazwa_użytkownika | Hasło      | Potwierdzenie_hasła |
            | Jan23             | Pasword_01 | Pasword_01          |
        When Próbuję się zarejestrować
        Then Przekierowany jest na stronę logowania

     # Rule: Użytkownicy powinni być unikalni
     Scenario Outline: Użytkownik, który próbuje się zarejestrować podaje istniejącą nazwę użytkownika
        Given Baza użytkowników zawiera następujących organizatorów
         | Nazwa_użytkownika |
         | wojtek            |
         When Organizator zapisów próbuje utworzyć konto użytkownika <nazwa_użytkownika>
         Then Nie może procesować rejestracji i widzimi komunikat "Nazwa użytkownika już istnieje"

         Examples:
         | przypadek | nazwa_użytkownika |
         | ta sama nazwa | wojtek |
         | duza litera   | Wojtek |

    
# zasady techniczne
    #Rule Wszystkie pola formularza są obowiązkowe
#Nazwa użytkownika
    #Rule Nazwa użytwkonika powinna zawierać tylko litery i cyfry
    #Rule Nazwa użytkownika powinna zawierać mieć długoś 3 - 32 

#Hasło
# wymagna długośc hasła
# Dozwolone znaki
# wymagana siła hasła
# średnia siła hasła
 Scenario Outline: Użytkownik, który próbuje się zarejestrować podaje słabe hasło
         Given Organizator zapisów podał nazwę użytkownika "Jan"
         When Organizator zapisów podaje hasło <haslo>
         Then Nie może procesować rejestracji i widzimi komunikat "komunikat"

         Examples:
         | zasada| haslo |komunikat|
         | musi zawierać minimum 8 znaków| Abcdef1 |Hasło musi zawierać minimum 8 znaków|
      #   | musi zawierać maksimum 64 znaki| abcdefghijklmnoprsqtuwyz123456789abcdefghijklmnoprsqtuwyz123456789!@#$%^&* |Hasło musi zawierać minimum 8 znaków|
         | musi zawierać dużą literę   | abcdef1 |
         | musi posiadać małą literę   | ABCDEFG1|
         | musi posiadać cyfrę literę   | ABCDEFGH |
         | musi posiadać 6 unikalnych wartości  | Aaabcde2|
         | nie może być taki jak nazwa użytkownika | Jan|
        
    # Rule: Należy wymóc potwierdzenie hasła
    Scenario: Uzytkownik podał nieprawidłoweg
       Given Organizator zapisów podał kod dostępu i nazwę użytkownika i hasło "Pasword_01"
        When Podaje potwierdzenie hasła "Pasword_02"
        Then Nie może procedować rejestracji i widzi komunikat "Podano błędne hasło"

    # Rule: W pierwszym etapie rozwoju aplikacji, właściciel systemu decyduje kto może w niej utworzyć konto