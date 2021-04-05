Feature: Zarządzanie kategoriami

Scenario: Dodanie kategorii
Given Nie dodano kategorii
When Dostawca dodaje kategorię "Bochenki"
Then Kategoria "Bochenki" znajduje się na liście

Scenario: Próbowano dodać kategorię z nieprowanymi danymi 
Given Nie dodano kategorii
When Dostawca dodaje kategorię "Bochenki"
Then Kategoria "Bochenki" znajduje się na liście

Scenario: Wyświetlono listę kategorii

