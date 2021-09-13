FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

COPY "/dist" /app/

ENTRYPOINT ["dotnet", "Zapisywarka.API.Host.dll"]
