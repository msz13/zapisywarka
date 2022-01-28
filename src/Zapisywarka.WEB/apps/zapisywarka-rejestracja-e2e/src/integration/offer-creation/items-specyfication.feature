Feature: Specyfikacja pozycji oferty

    @second story @web @api
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
    @api
    Scenario: Organizator zapisów wybiera jednostkę ilości pozycji
        When Organizator zapisów chce wybrać jednostkę ilości pozucji oferty
        Then Ma do dyspozycji następujące jednostki:
            | Nazwa jednostki | Skrót  |
            | Sztuki          | szt.   |
            | Kilogramy       | kg.    |
            | Litry           | l.     |
            | Porcje          | Porcja |

    #Rule pozycje powinny mieć unikalne nazwy

    @api @ui
    Scenario: Organizator zapisów specyfikuje pozycje z tą samą nazwą
        Given Jan organizator zapisów wskazał pozycje oferty:
            | Nazwa |
            | Chleb |
            | Chleb |
        When Zapisuje ofertę
        Then Widzi komunikat błędu "Nazwy pozycji oferty nie mogą się powtarzać"

    
    #Rule: Lista pozycji nie może być pusta.
    @api @ui
    Scenario: Organizator zapisów nie wskazał pozycji oferty
        Given Jan organizator zapisów wskazał pozycje oferty:
            | Nazwa |
            |       |
        When Zapisuje ofertę
        Then Widzi komunikat błędu "Należy wskazać przynajmniej jedną pozycję oferty"

    #Rule: Organizator zapisów może wskazać ceny pozycji
    #Rule pozycje mogę mieć kategorie

    @web @api
    Scenario: Jan organizator zapisów tworzy ofertę zawierającą pozycje z maksymalną ilością właściwości
        Given Jan organizator zapisów wskazał nazwę oferty "Poniedziałek"
        And Wskazał pozycje oferty:
            | Nazwa     | Jednostka | Cena zł | Kategoria |
            | Chleb     | szt.      | 10      | Bochenki  |
            | Ziemniaki | kg        | 2       | Foremkowe |
        When Zapisuje ofertę
        Then Oferta zapisów o nazwie "Poniedziałek" jest dostępna do zbierania zapisów
        And Zawiera następujące pozycje:
            | Kateogria | Nazwa     | Jednostka | Cena zł |
            | Bochenki  | Chleb     | szt.      | 10      |
            | Foremkowe | Ziemniaki | kg        | 2       |



#Rule: Organizator zapisów może wskazać opis pozycji i zdjęcie