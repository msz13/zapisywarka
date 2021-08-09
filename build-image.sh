#!/bin/bash

dotnet clean ./src/Zapisywarka.API/HOST/Zapisywarka.API.Host/Zapisywarka.API.Host.csproj \
&& \
dotnet publish ./src/Zapisywarka.API/HOST/Zapisywarka.API.Host/Zapisywarka.API.Host.csproj -o ./src/Zapisywarka.API/dist/ \
&& \
docker build -f ./src/Zapisywarka.API/Dockerfile -t zapisywarka-api . 
