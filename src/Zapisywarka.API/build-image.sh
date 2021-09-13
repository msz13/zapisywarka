#!/bin/bash

dotnet build ./HOST/Zapisywarka.API.Host/Zapisywarka.API.Host.csproj -o ./dist \
&& \
echo "tag: $IMAGE" && \
docker build -t $IMAGE .