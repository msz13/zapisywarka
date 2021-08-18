Feature: Landing page naviation

    Jako niezalogowany użytkownik portalu
    chcę mieć możliwość łatwego zalogowania lub stworzenia nowego konta po wejściu na stronę główną,
    aby móc korzystać z prywatnych zasobów aplikacji.

Background: 
    Given Użytkownik odwiedził stronę główną

#Rule: Nowy użytkownik po wejściu na stronę główną powinien mieć możliwość stworzenia nowego konta. 
Scenario: Przejście do strony tworzenia konta
When Użytkownik kliknie link Załóż konto
Then Powinien zobaczyć stronę tworzenia konta

#Rule: Wylogowany użytkownik po wejściu na stronę główną powinien mieć możliwość przejścia do strony logowania.
Scenario: Przejście do strony tworzenia konta
When Użytkownik kliknie link Zaloguj
Then Powinien zobaczyć stronę logowania