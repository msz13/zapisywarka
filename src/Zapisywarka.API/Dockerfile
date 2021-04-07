#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build
WORKDIR /src
COPY ["src/Zapisywarka.API/HOST/Zapisywarka.API.Host/Zapisywarka.API.Host.csproj", "HOST/Zapisywarka.API.Host/"]
RUN dotnet restore "HOST/Zapisywarka.API.Host/Zapisywarka.API.Host.csproj"
COPY "src/Zapisywarka.API" .
WORKDIR "/src/HOST/Zapisywarka.API.Host"
RUN dotnet build "Zapisywarka.API.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Zapisywarka.API.Host.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Zapisywarka.API.Host.dll"]