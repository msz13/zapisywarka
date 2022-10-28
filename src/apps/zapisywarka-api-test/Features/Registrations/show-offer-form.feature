Feature: Prezentacja formularza zbierania zapisów dla koordynatora

Aby móc przyjmować zapisy, na pozycje określone w swojej ofercie, po stworzeniu oferty dostępny jest formularz zawierający informacje zawarte w ofercie.
  
  
    * ułatwić zbieranie zapisów, poprzez ich późniejsze łatwiejsze wyszukiwanie, 
      przeglądanie, dokonywanie operacji na nich, gromadzenie informacji o realizowanych operacjach
    * ułatwić ich zabieranie poprzez różne kanały i źródła,

Background:
    Given Koordynator zapisów "Andrzej" jest zalogowany


@web @current
Scenario: Przyjmujący zapisy przegląda formularz zapisów
    
    Given Organizator zapisów stworzył ofertę o nazwie "Poniedziałek" zawierającą następujące pozycje:
                | Nazwa                      | 
                | Chleb wiejski              | 
                | Chleb foremkowy z żurawiną | 
                | Chleb foremkowy z oliwkami |                      
    When Przegląda formularz rejestracji/formularz przyjmowania zapisów 
    Then Formularz zapisów, zawiera powyższe dane
