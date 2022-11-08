FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine

# Install cultures (same approach as Alpine SDK image)
RUN apk add --no-cache icu-libs

# Disable the invariant mode (set in base image)
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

COPY "/dist/apps/zapisywarka-api/" /app/

ENTRYPOINT ["dotnet", "./net6.0/ZapisywarkaClientAps.ZapisywarkaApi.dll"]
