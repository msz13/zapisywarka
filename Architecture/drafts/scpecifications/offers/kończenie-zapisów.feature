            
Feature: Zakończenie zapisu przez organizatora

    Jako organizator zapisów, chcę mieć możliwość zakończenia zabieranie zapisów,
    aby łatwiej móc selekcjonować w oferty, w których nadal przyjmować zapisy.
    W przyszłości również, chcę uniemożliwić składanie zapisów przez klientów i współpracowników, 
    gdy zapisy się zakończą z powodu terminu ich upłynięcia lub skończenia ilości dostępnych pozycji.

Scenario: Organizator kończy zbieranie zapisów

Given Given Jan organizator zapisów tworzy ofertę nazywającą się "Poniedziałek"
When Kończy zbierać zapisy
Then Oferta "Poniedziałek" jest oznaczona jako zakończona 
  