FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

COPY "/dist/apps/zapisywarka-api/" /app/

ENTRYPOINT ["dotnet", "./net6.0/ZapisywarkaClientAps.ZapisywarkaApi.dll"]
