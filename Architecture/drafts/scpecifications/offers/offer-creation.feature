// Feature: Tworzenie oferty

Jako organizator zapisów,
chcę móc stworzyć ofertę zapisów
aby klienci widzieli na co się mogą zapisać
aby pokazać co mam do zaoferowania

Feature: Kreator formularza zapisów
    Jan, restaurator,
    aby móc przyjmować zapisy,
    może zdefinować formularz na którym są one przyjmowane
    może zdefiniować zasady, których dotyczą



    Scenario: Sprzedawca tworzy formularz zapisów
        Given Jan organizator zapisów tworzy ofertę nazywającą się "Poniedziałek"
        When Zapisuje ofertę
        Then  Oferta o nazwie "Poniedziałek" dodana jest do listy aktywnych ofert

    Scenario: Sprzedawca tworzy formularz zapisów
        Given "Jan" sprzedawca tworzy formularz zapisów nazywający się "Boże Narodzenie 2021"
        When Zapisuje formularz
        Then Formularz zapisów dostępny jest pod adresem "zapisywarka.pl/zapisy/jan/boze-narodzenie-2021"

    Scenario: Klient przegląda szczegóły formularza
        Given "Jan" sprzedawca tworzy formularz zapisów nazywający się "Boże Narodzenie 2021"
        When Klient odwiedza formularz zapisów
        Then Widzi następujące dane:

            | Nazwa oferty           | Organizator | Opis oferty               |
            | "Boże Narodzenie 2021" | Jan         | Katering Bożonarodzeniowy |



#Rule sprzedawca może wskazać pozycje oferty

#Rule sprzedawca może wskazać datę rozpoczęcia i zakończenia zapisów, a także odbiorów