FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine
WORKDIR /build
COPY apps/db-migrations/ZapisywarkaClientAps.DbMigrations.csproj ./
RUN dotnet restore 
COPY apps/db-migrations/Program.cs .
RUN dotnet publish -o /publish 
WORKDIR /publish 
#ENTRYPOINT ["dotnet", "DbMigrator.dll"]
CMD ["sh", "-c", "dotnet ZapisywarkaClientAps.DbMigrations.dll \"${DB_CONNECTION}\""]