workspace "Getting Started" "This is a model of my software system." {

    model {
        administrator = person "Administrator" "Właściciel systemu"
        softwareSystem = softwareSystem "Zapisywarka" "System do organizacji zapisów" {
            webRejestracja = container "zapisywarka.pl" "SPA/Angular" "Aplikacja przeznaczona do organizacji zapisów" {
                url "https://zapisywarka.pl"
                properties {
                    "prod-url" "https://zapisywarka.pl"
                }
            }

            webAdministracja = container "admin.zapisywarka.pl" "SPA/Angular" "Aplikacja przeznaczona dla administratora do zarządzania kontami" {
                url "https://admin.zapisywarka.pl/"
            }

            webOferty = container "zapisywarka.pl/oferty" "SPA/Angular" "Aplikacja przeznaczona dla klientów do skłądania zapisów on-line" {
                url "https://zapisywarka.pl/oferty"
            }
            api =  container "ZAPISYWARKA.API" "ASP Core" {
                group "UserAccess" { 
                    authentication = container "Authentication" "Razor Pages + Identity Server" Obsługa procesu autentykacji i auto-rejestracji użytkowników
                    userMenagementCore = container "User.Menagement.Core" "ASP Identity" "Obsługa operacji CRUD wobec użytkowników systemu"
                    userMenagementApi = container "User.Menagement.API" "ASP REST API" "Obsługa operacji CRUD wobec użytkowników systemu"
                }
            }
            db =  container "Database" "Postgresql" {
                url "https://zapisywarka.pl/api"
            }

            webRejestracja -> api "Makes API calls" "HTTPS/JSON" 
            webAdministracja -> api "Makes API calls" "HTTPS/JSON" 
            webOferty -> api "Makes API calls" "HTTPS/JSON"
            webRejestracja -> api "Makes API calls" "HTTPS/JSON"
            api -> db "Reads and writes to"
        }

        administrator -> softwareSystem "Manges users accaunts, define user accaunts types, permissions and prices"
    }

    views {
        systemContext softwareSystem "SystemContext" {
            include *
            autoLayout
        }

         container softwareSystem "Containers" {
            include *
            autoLayout
        }


        styles {
            element "Software System" {
                background #1168bd
                color #ffffff
            }
            element "Person" {
                shape person
                background #08427b
                color #ffffff
            }
        }
    }
    
}
