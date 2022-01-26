Feature: Specyfikacja pozycji oferty

    @second story
    Scenario: Sprzedawca tworzy formularz zapisów
        Given Jan organizator zapisów wskazał nazwę oferty "Poniedziałek"
        And Wskazał pozycje oferty:
            | Nazwa     | Jednostka |
            | Chleb     | szt.      |
            | Ziemniaki | kg        |
        When Zapisuje ofertę
        Then Oferta zapisów o nazwie "Poniedziałek" jest dostępna do zbierania zapisów
        And Zawiera następujące pozycje:
            | Nazwa     | Jednostka |
            | Chleb     | szt.      |
            | Ziemniaki | kg        |

    #Rule pozycje mogą być specyfikowane w różnych jednostkach
    Scenario: Organizator zapisów wybiera jednostkę ilości pozycji
        When Organizator zapisów chce wybrać jednostkę ilości pozucji oferty
        Then Ma do dyspozycji następujące jednostki:
            | Nazwa jednostki | Skrót  |
            | Sztuki          | szt.   |
            | Kilogramy       | kg.    |
            | Litry           | l.     |
            | Porcje          | Porcja |

    #Rule pozycje powinny mieć unikalne nazwy

    Scenario: Organizator zapisów specyfikuje pozycje z tą samą nazwą
        Given Jan organizator zapisów wskazał pozycje oferty:
            | Nazwa |
            | Chleb |
            | Chleb |
        When Zapisuje ofertę
        Then Widzi komunikat błędu "Nazwy pozycji oferty nie mogą się powtarzać"

    #Rule: Lista pozycji nie może być pusta.

    Scenario: Organizator zapisów nie wskazał pozycji oferty
        Given Jan organizator zapisów wskazał pozycje oferty:
            | Nazwa |
            |       |
        When Zapisuje ofertę
        Then Widzi komunikat błędu "Należy wskazać przynajmniej jedną pozycję oferty"

        #Rule: Organizator zapisów może wskazać ceny pozycji
        Given Jan organizator zapisów wskazał nazwę oferty "Poniedziałek"
        And Wskazał pozycje oferty:
            | Nazwa     | Jednostka | Cena zł |
            | Chleb     | szt.      | 10      |
            | Ziemniaki | kg        | 2       |
        When Zapisuje ofertę
        Then Oferta zapisów o nazwie "Poniedziałek" jest dostępna do zbierania zapisów
        And Zawiera następujące pozycje:
            | Nazwa     | Cena zł |
            | Chleb     | 10      |
            | Ziemniaki | 2       |

#Rule: Organizator zapisów może wskazać opis pozycji i zdjęcie