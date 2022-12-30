FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build
WORKDIR /build
COPY apps/db-migrations/ZapisywarkaClientAps.DbMigrations.csproj ./
RUN dotnet restore 
COPY apps/db-migrations/Program.cs .
RUN dotnet publish -o /publish 
WORKDIR /publish 

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as final
WORKDIR /publish 
COPY --from=build /publish .
COPY ./apps/db-migrations/scripts ./scripts
#ENTRYPOINT ["dotnet", "DbMigrator.dll"]
ENTRYPOINT ["sh", "-c", "dotnet ZapisywarkaClientAps.DbMigrations.dll"]
#CMD