// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace Zapisywarka.API.Modules.Identity.IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("Zapisywarka.API"),
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                // m2m client credentials flow client
                new Client
                {
                    ClientId = "m2m.client",
                    ClientName = "Client Credentials Client",

                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },

                    AllowedScopes = { "Zapisywarka.API" }
                },

                  new Client
                {
                    ClientId = "spa",
                    ClientName = "Zapisywarka.Rejestracja",
                    ClientSecrets = { new Secret("F4E9B555-BE90-40E6-8110-224E439EE87C".Sha256()) },

                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = false,
                    RequirePkce = true,

                    RedirectUris = { "http://localhost:4200/index.html" },
                    FrontChannelLogoutUri = "http://localhost:4200/index.html",
                    PostLogoutRedirectUris = { "http://localhost:4200" },

                    AllowedCorsOrigins = {"http://localhost:4200" },

                    AllowOfflineAccess = true,
                    AllowedScopes =
                      {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "Zapisywarka.API"
                    }
                },
            };
    }
}