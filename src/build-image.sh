#!/bin/bash

nx build --prod \
&& \
echo "tag: $IMAGE" && \
docker build -t $IMAGE -f apps/zapisywarka-rejestracja/Dockerfile .