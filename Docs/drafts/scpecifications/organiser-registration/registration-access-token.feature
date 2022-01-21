Feature: Walidacja tokenu dostępowego podczas rejestracji/

    W pierwszym etapie rozwoju aplikacji, właściciel systemu chce decydować, kto może w niej utworzyć konto

    
      Background: 
        Given Administrator skonfigurował token dostępowy "TbkdNPHf"

        Scenario: Organizator zapisów podaje nieistniejący kod dostępu do aplikacji
            Given Organizator zapisów podał kod dostępu "BADcode1"
            When Próbuje się zarejestrować
            Then Nie może uzupełnić kolejnych danych i widzi komunikat "Podany kod jest nieprawidłowy. Jeśli chcesz używać aplikacji zapisywarka, skontaktuj się z administratorem, aby otrzymać prawidłowy kod dostępu"


     
     