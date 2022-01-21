    #Rule Po przyjęciu zapisu sprzedawca widzi liczbę złożonych zapisów na dane produkty
    Scenario: Po przyjęciu zapisu sprzedawca widzi liczbę złożonych zapisów na dane produkty
        Given Oferta jest aktywna
        And Zawieraja pozycje:
            | Name                       | Price |
            | Chleb wiejski              | 9     |
            | Chleb foremkowy            | 9     |
            | Chleb foremkowy z żurawiną | 10    |
        And Złożono zapisy na określoną ilosć pozycji:
            | Id | Chleb wiejski | Chleb foremkowy | Chleb foremkowy z żurawiną |
            | 1  | 1             | 1               | 1                          |
            | 2  | 1             | 3               | 1                          |
            | 3  | 0             | 0               | 2                          |

        Then Widzi liczbę rezerwacji na dane produkty
            | ProductName                | ReservedITems |
            | Chleb wiejski              | 2             |
            | Chleb foremkowy            | 4             |
            | Chleb foremkowy z żurawiną | 4             |
        And Oraz informacje o liczbie zapisów na ofertę: "3"