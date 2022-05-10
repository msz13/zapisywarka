Feature: Edycja oferty przed zapisem   
  

        #Rule Organizator może usunąć pozycję w czasie tworzenia
        Given Organizator zapisów dodaje pozycje oferty:
            | ProductName     |
            | Chleb wiejski   |
            | Chleb foremkowy |
        When Usuwa "Chleb foremkowy" z listy pozycji
        Then Lista pozycji zawiera:
            | ProductName   |
            | Chleb wiejski |

       



    #Rule Organizator może porządkować kolejność zapisów
 
        Given Organizator zapisów dodaje pozycje oferty:
            | ProductName     |
            | Chleb wiejski   |
            | Chleb foremkowy |
            | Bułka |
        When Przesuwa pozycję "Bułka" na początek listy
        Then Lista pozycji zawiera:
            | Bułka |
            | ProductName   |
            | Chleb wiejski |
            