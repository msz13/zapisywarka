Feature: Walidacja hasła

     Aby zabezpieczyć dane użytkowników oraz uniknać błędów użytkownika,
     należy należy wymóc, odpowiednią siłę hasła i potwierdzenie hasła.
    
Background:
 Given Organizator uzupełnił kod dostępu "TbkdNPHf"

Scenario: Użytkownik, który próbuje się zarejestrować podaje zbyt słabe hasło
Given Podał zbyt słabe hasło
When Próbuje się zarejestrować
Then Nie może procesować rejestracji konta i widzi komunikat błędu


Scenario Outline: Użytkownik, który próbuje się zarejestrować podaje słabe hasło
         Given Organizator zapisów podał prawidłowy kod dostępu
         When Organizator zapisów podaje hasło <haslo>
         Then Nie może procesować rejestracji i widzimi komunikat błędu


Scenario Outline: 
         When Organizator zapisów podaje hasło <haslo>
         Then Nie może procesować rejestracji i widzimi komunikat <komunikat>

Examples:
         | zasada | haslo | komunikat |
         | musi zawierać minimum 8 znaków | Abcdef1 |Hasło musi zawierać minimum 8 znaków |
   #     | musi zawierać maksimum 32 znaki| abcdefghijklmnoprsqtuwyz123456789abcdefghijklmnoprsqtuwyz123456789!@#$%^&* |Hasło musi zawierać minimum 8 znaków|
         | musi zawierać dużą literę | abcdef1 |
         | musi posiadać małą literę | ABCDEFG1 |
         | musi posiadać cyfrę literę | ABCDEFGH |
         | musi posiadać 6 unikalnych wartości | Aaabcde2 |
         | nie może być taki jak nazwa użytkownika | Jan |
  

    # Rule: Należy wymóc potwierdzenie hasła
    Scenario: Uzytkownik potwierdził nieprawidłoweg hasło
       Given Organizator zapisów podał kod dostępu, nazwę użytkownika i hasło "Pasword_01"
        When Podaje potwierdzenie hasła "Pasword_02"
        Then Nie może procedować rejestracji i widzi komunikat "Podano błędne hasło"
