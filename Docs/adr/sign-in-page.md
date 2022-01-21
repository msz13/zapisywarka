# Obsługa autentykacji


## Status

in-progress

## Context

Do autentykacji wykorzystano protokół openId implicit flow z PKCE jako rekomendowany dla aplikacji typu SPA.

PO stronie serwera należy zaimplementować login page. 
Można, to zrobić przy pomocy:
- asp core mvc identity server template
- razor pages idenitity scafold
- stworzenie swojej strony logowania z użyciem angular elements oraz sign in poprzez api call (i tak trzeba zmienić ui z bootstrap na angular material, ale wymaga opracowania swojego kontrolera, formularza, itd)
- hostowanie identity server jako osobnej aplikacji w osobnym kontenerze
- użycie zewnętrznego dostawcy, np. Auth0 albo Azure B2c 
- jaki url powinien być?

Kryteria wyboru:
- czasochłonność wdrożenia
- obsługa social media
- pokazanie umiejętności autentykacji
Wymagania:
- obsługa social media
- obsługa rejestracji konta na zaproszenie z wykorzystaniem social login
- przestrzeganie standardów RODO - czyli musi być w UE
- obsługa konta organizacyjnych i indywidualnych
## Decision

- 


## Reason
Umożliwiają dodanie widoków w podprojekcie, bez dodawania dodatkowych zależności do projektu Host.
Pozwolą mi się nauczyć Razor Pages.

- odrzucono zewnętrzengo dostawcę - w przyszłości będzie potrzebny specyficzny flow - potwierdzenie rejestracji konta przez członka organizacji przy pomocy social media, co będzie trudno do realizacji, ale może wykorzystac obecnie?
- 

