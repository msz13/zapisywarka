#!/bin/bash

dotnet build ./ZapisywarkaClientAps.ZapisywarkaApi \
&& \
echo "tag: $IMAGE" && \
docker build -t $IMAGE .