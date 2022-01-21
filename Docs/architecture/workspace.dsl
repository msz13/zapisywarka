workspace "Getting Started" "This is a model of my software system." {

    !adrs decisions

    model {
        administrator = person "Administrator" "Właściciel systemu"
        organizator = person "Organizator zapisów"
        zapisywarka = softwareSystem "Zapisywarka.pl" "System do organizacji zapisów" {
            webRejestracja = container "zapisywarka.pl" "SPA/Angular" "Aplikacja przeznaczona do organizacji zapisów" {
                url "https://zapisywarka.pl"
                properties {
                    "prod-url" "https://zapisywarka.pl"
                }
            }
            
            api =  container "ZAPISYWARKA.API" "ASP Core" {
              url "https://api.zapisywarka.pl/"
            }
            db =  container "Database" "Postgresql" {
                
            }

            webRejestracja -> api "Makes API calls" "HTTPS/JSON" 
            webRejestracja -> api "Makes API calls" "HTTPS/JSON"
            api -> db "Reads and writes to"
        }

        organizator -> zapisywarka "Zbiera zapisy"

        prod = deploymentEnvironment "Srodowisko produkcyjne" {
            deploymentNode "Oracle Claud" {

              lb = infrastructureNode "Load balancer" {
                  tags "Oracle Cloud Infrastructure - Load Balancer"
              }

               k3s = deploymentNode "K3s klaster" { 
                   tags "K3s"                  
                    
                        deploymentNode "OCI subnet - server" {
                            deploymentNode "OCI Compute Instance" {
                                server = infrastructureNode "K3s server"
                            }
                        }                  

                   
                        deploymentNode "OCI subnet - agents" {
                            deploymentNode "OCI Compute pool - Oracle Linux" {
                                tags "Oracle Cloud Infrastructure - Instance Pools"
                               agents = deploymentNode "K3s agents pool" {
                                    
                                    deploymentNode "Nginx container" {
                                        containerInstance webRejestracja
                                    }

                                    deploymentNode "Dotnet container" {
                                        containerInstance api
                                    }

                                    deploymentNode "StackGres postrgresql cluster" {
                                        containerInstance db
                                    }

                                }
                            }
                        }
                    
                }

                lb -> k3s "Przekierowuje ruch"
                
                server -> agents
            }
        }
    }

    views {
        systemContext zapisywarka "SystemContext" {
            include *
            autoLayout
        }

         container zapisywarka "Containers" {
            include *
            autoLayout
        }

        deployment zapisywarka prod {
            include *
            autoLayout lr
        }

        theme https://static.structurizr.com/themes/oracle-cloud-infrastructure-2021.04.30/theme.json


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

            element "k3s" {
                icon https://cncf-branding.netlify.app/img/projects/k3s/horizontal/color/k3s-horizontal-color.png
            }
        }
    }
    
}
