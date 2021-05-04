# Jaki framework użyć do sign-in-page


## Status

in-progress

## Context

Do autentykacji wykorzystano protokół openId z IdentityServer.
PO stronie serwera należy zaimplementować login page. 
Można, to zrobić przy pomocy:
- asp core mvc identity server template
- razor pages idenitity scafold
- stworzenie swojej strony logowania z użyciem angular elements oraz sign in poprzez api call (i tak trzeba zmienić ui z bootstrap na angular material, ale wymaga opracowania swojego kontrolera, formularza, itd)
- hostowanie identity server jako osobnej aplikacji w osobnym kontenerze

## Decision

- wybrano Razor pages, z użyciem scafoldowanego ASP Identity


## Reason
Umożliwiają dodanie widoków w podprojekcie, bez dodawania dodatkowych zależności do projektu Host.
Pozwolą mi się nauczyć Razor Pages.

