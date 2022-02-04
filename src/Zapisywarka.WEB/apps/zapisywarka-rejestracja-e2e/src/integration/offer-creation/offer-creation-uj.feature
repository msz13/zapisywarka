Feature: Tworzenie oferty zapisów

  Organizator zapisów musi stworzyć formularz zapisów, aby w łatwy sposób móc wprowadzać zapisy klientów.
  W formularzu będzie zawierał ofertę, na którą będzie zbierał zapisy.
  W kolejnych wersjach aplikacji poprzez formularz będą mogli składać również klienci.

  Background:
    Given Jest "2021-12-18T15:13"

  @web @api @e2e
  Scenario: Sprzedawca tworzy formularz zapisów
    Given Jan organizator zapisów wskazał nazwę oferty "Poniedziałek"
    And Wskazał pozycje oferty:
      | Nazwa     |
      | Bochenek  |
      | Foremkowy |
    When Zapisuje ofertę
    Then Oferta zapisów o nazwie "Poniedziałek" jest dostępna do zbierania zapisów
    And Zawiera następujące pozycje:
      | Nazwa     |
      | Bochenek  |
      | Foremkowy |


  @ui
  #Offer Management
  Scenario: Organizator zapisów tworzy ofertę za pomocą strony internetowej
    Given Jan organizator zapisów wskazał poprawne dane oferty
    When Zapisuje ofertę
    Then Przekierowywany jest na stronę startową
    And List zapisów zawiera zapis
    And Może otworzyć i przejrzeć szczegóły zapisu

  Scenario: Oferta dostępna jest pod przyjaznym linkiem

  #
Feature: Tworzenie oferty
#Rule Utworzenie oferty
#Rule Organizator zapisów musi wsakać jednostkę ilości
#Rule Kategorie
#Edge cases
#server error
#server input error
#tylko twórca oferty może mieć do niej dostęp
Feature: Walidacja utworzenia oferty
#Rule nie można utworzyć oferty bez wskazania pozycji
#Rule pozycje powinny mieć unikalne nazwy
#Rule: Lista pozycji nie może być pusta.
Feature: Modyfikacja oferty przed utworzeniem
#Rule Organizator może zmienić nazwę pozycji w czasie tworzenia
#Rule Dodane kategorie podpowiadają się organizatorowi
#Rule Organizator może porządkować kolejność zapisów
Feature: Pricing
Feature: Specyfikacja dat
Feature:
    Testy
    1. Accptance - workflow z autentykacją
    2. Container ui- workfow, validatiom, offer modification
    3. Container api- workfow, z autentykacją
    3. Component - behaviour, ui
    4. Unit
    * smart component
    * ui component
    * service

###Zadania:
1. Offer creation -web i ui
2. Offer validation - web i ui
3. Offer modyfication - web
4. OPen api

Kroki cI
- web ci: test, lint, e2e + snapshot
-